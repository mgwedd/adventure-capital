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
    STORE.selectedPark = STORE.npsResponse.data[selectedParkID];
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
// ======================== NPS API CALL ========================
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
    const npsResponseObj = await npsResponse.json();
    renderParkSearchResults(npsResponseObj, maxResults);
    STORE.npsResponse = npsResponseObj;
    watchSearchResults();
    console.log('Here\'s the response from NPS: ', npsResponseObj);
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
    const locationResponseObj = await npsResponse.json();
    // pass the location key Accuweather returns for the park's geoposition into getForeceast().
    getForecast(locationResponseObj.Key);
    STORE.locationResponse = locationResponseObj;
    console.log('Here\'s the response from AccuWeather\'s Location API: ', locationResponseObj);
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
    const forecastResponseObj = await forecastResponse.json();
    STORE.forecastResponse = forecastResponseObj;
    renderModal();
    console.log('Here\'s the response from AccuWeather\'s Forecast API: ', forecastResponseObj);
  } catch(error) {
    $('#js-error-message').text(`Uh ho... We couldn't complete your request. Here's why: ${error.message}`);
  }
}
// ====================================================
// ======== DISPLAY RESULTS (ALL APIS) ================
function renderParkSearchResults(responseObj, maxResults) {
    $('#js-search-results-list').empty();
    for (let i = 0; i < maxResults && i < responseObj.data.length; i++) {
      $('#js-search-results-list').append(
        // The `ì` added as a data attr represents index of the object in the responseObj.data array from which the result is being displayed. 
        // This is so that other parts of the application (e.g. listeners) can easily locate the data to which this title refers.
        `<li><h3 data-nps-response-index="${i}" class="js-search-result-title search-result-title">${responseObj.data[i].fullName}</h3>
        <p><strong>State(s):</strong> ${responseObj.data[i].states}</p>
        <p><strong>Description:</strong> ${responseObj.data[i].description}</p>
        <p><strong>Designation:</strong> ${responseObj.data[i].designation}</p>
        <p><strong>Park Directions:</strong> ${responseObj.data[i].directionsInfo}</p>
        </li>`
      );
    }
    $('#js-search-results').removeClass('hidden');
}

function renderModal(parkFullName) {
  // this is the master function for the Modal screen. 
  // renderForecast();
  // renderMoreParkInformation();
}

function renderForecast(responseObj) {
  // called from renderModal
  //  look at Apple weather app. Simple.
}

function renderMoreParkInformation() {
  // called from renderModal
  // this function just pulls more info from NPS's response, like hiking and camping info. Or it makes another more if needed, for a diff. endpoint.
}

// ========= DOCUMENT READY ===========
$(watchSearchForm);
// ====================================