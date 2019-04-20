'use strict';
// =============================================================
// ================ SEARCH LISTENERS & HANDLERS ================
function watchSearchForm() {
  $('form').submit(event => {
    event.preventDefault();
    try {
      let rawInput = $('#js-search-parks').val();
      // Input must be at least two contiguous letters. Only commas and spaces allowed as seperators.
      if (/^(\s*[a-zA-Z]{2}\s*,?)+$/.test(rawInput)) {
        const searchInput = rawInput.replace(/[, ]+/g, ',').trim();
        const maxResults = $('#js-max-results').val();
        getParks(searchInput, maxResults);
      } else {
        throw Error('Whoops, that won\'t work. Enter state state code(s) like "NY, MA"');
      }
    } catch(error) {
      alert(error.message);
    }
  });
}

function watchSearchResults() {
  $('#js-search-results-list').on('click', '.js-search-result-title', event => {
    event.preventDefault();
    const selectedParkID = $(event.currentTarget).data("data-nps-response-index"); // This is the location in the responseObj of the obj containing the selected park.
    STORE.selectedPark = STORE.npsParksResponse.data[selectedParkID];
    getAccuweatherLocation(STORE.selectedPark.latLong);
  });
}
// ================================================================
// ======================= QUERY FORMATTING =======================
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
// ==============================================================
// ======================== NPS API CALLS ========================
async function getParks(searchInput, maxResults) {
  const npsSearchURL = 'https://developer.nps.gov/api/v1/parks?';
  const npsApiKey = 'JVeSBRlmeioOK5HNO6ev6IpsIwcPWH1dXgpk2SxN';
  const params = {
    'stateCode': searchInput,
    limit: parseInt(maxResults),
    api_key: npsApiKey
  }
  const formattedQuery = formatQueryParams(params);
  const url = npsSearchURL + formattedQuery;
  try {
    const npsResponse = await fetch(url);
    if (!npsResponse.ok) {
      throw new Error(npsResponse.statusText);
    }
    STORE.npsParksResponse = await npsResponse.json();
    renderParkSearchResults(maxResults);
    watchSearchResults();
    console.log('Here\'s the response from NPS: ', STORE.npsParksResponse);
    } catch(error) {
      $('#js-error-message').text(`Uh ho... We couldn't complete your request. Here's why: ${error.message}`);
    }
}

// ===============================================================
// ================ ACCUWEATHER LOCATION API CALL ================
async function getAccuweatherLocation(parkCoordinates) {
  const LocationSearchURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';
  const locationAPIKey = '4necePoPQpKdSd2EbjAHXIotYDIna8vN';
  // NPS returns with lat and lon in string, which AccuWeather doesn't want.
  const formattedParkCoordinates = parkCoordinates.replace(/lat:|\slong:/, ''); 
  const params = {
    apiKey: locationAPIKey, 
    q: formattedParkCoordinates
  };
  const formattedQuery = formatQueryParams(params);
  const url = LocationSearchURL + formattedQuery;
  try {
    const locationResponse = await fetch(url); 
    if (!locationResponse.ok) {
      throw new Error(locationResponse.statusText);
    }
    // pass the location key Accuweather returns for the park's geoposition into getForeceast().
    STORE.accuLocationResponse = await locationResponse.json();
    getForecast(STORE.accuLocationResponse.Key);
    console.log('Here\'s the response from AccuWeather\'s Location API: ', STORE.accuLocationResponse);
  } catch(error) {
    $('#js-error-message').text(`Uh ho... We couldn't complete your request. Here's why: ${error.message}`);
  }
}
// ===============================================================
// ================ ACCUWEATHER FORECAST API CALL ================
async function getForecast(locationKey) {
  const forecastSearchURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const forecastApiKey = '4necePoPQpKdSd2EbjAHXIotYDIna8vN';
  const url = forecastSearchURL + locationKey + '?' + 'apiKey=' + forecastApiKey;
  const forecastResponse = await fetch(url);
  try {
    if (!forecastResponse.ok) {
      throw new Error(forecastResponse.statusText);
    }
    STORE.accuForecastResponse = await forecastResponse.json();;
    renderModal();
    console.log('Here\'s the response from AccuWeather\'s Forecast API: ', STORE.accuForecastResponse);
  } catch(error) {
    $('#js-error-message').text(`Uh ho... We couldn't complete your request. Here's why: ${error.message}`);
  }
}
// ====================================================
// ======== DISPLAY RESULTS (ALL APIS) ================
function renderParkSearchResults(maxResults) {
    $('#js-search-results-list').empty();
    for (let i = 0; i < maxResults && i < STORE.npsParksResponse.data.length; i++) {
      $('#js-search-results-list').append(
        // The `ì` added as a data attr represents index of the object in the responseObj.data array from which the result is being displayed. 
        // This is so that other parts of the application (e.g. listeners) can easily locate the data to which this title refers.
        `<li>
        <h3 data-nps-response-index="${i}" class="js-search-result-title search-result-title">${STORE.npsParksResponse.data[i].fullName}</h3>
        <section id="js-park-planner-container" class="park-planner-container">
          <p id="js-park-state-text"><strong>State(s):</strong> ${STORE.npsParksResponse.data[i].states}</p>
          <p id="js-park-description-text"><strong>Description:</strong> ${STORE.npsParksResponse.data[i].description}</p>
        </section>
        </li>`
      );
    }
    $('#js-search-results').removeClass('hidden');
}

// <img src="${STORE.npsParksResponse.data.images[0].url}" alt="a picture of the national park: ${STORE.npsParksResponse.data.fullName}">

function renderParkPlanner() {
  // This is the master function for the planner screen. 
  $('#js-park-info-container').empty(); // Is this needed ...? 
  $('#js-park-info-container').html(
    `<div class="extended-nps-info-container>
      <p><strong>State(s):</strong> ${STORE.selectedPark.data.states}</p>
      <p><strong>Description:</strong> ${STORE.selectedPark.data.description}</p>
      <p><strong>Designation:</strong> ${STORE.selectedPark.data.designation}</p>
      <p><strong>General Climate:</strong> ${STORE.selectedPark.data.weatherInfo}</p>
      <p><strong>Directions:</strong> ${STORE.selectedPark.data.directionsInfo} <a href="${STORE.selectedPark.data.directionsUrl}">Find your way there!</a></p>
      <p><strong>Website:</strong> <a href="${STORE.selectedPark.data.url}">Learn more about the park.</a></p>
    </div>

    <div class="forecast-container">
      
    </div>`
  ); 
}

// function renderForecast(responseObj) {
//   // called from renderModal
//   // look at Apple weather app. Simple.
// }

// function renderMoreParkInfo() {
//   // called from renderModal
//   // this function just pulls more info from NPS's response, like hiking and camping info. Or it makes another more if needed, for a diff. endpoint.
//   $('#js-nps-modal-park-card-container').html(
//     ``
//   );
  // Name
  // Image
  // description 
  // camping info (if any) (new call)
  // visitor’s center (new call)
  // directions info linked to directions url.

// ========= DOCUMENT READY ===========
$(watchSearchForm);
// ====================================