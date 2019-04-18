'use strict';
// =============================================================
// ================ SEARCH LISTENERS & HANDLERS ================
function watchSearchForm() {
  let searchInput;
  let maxResults;
  $('form').submit(event => {
    event.preventDefault();
    try {
      let rawInput = $('#js-search-parks').val();
      // Input must be at least two contiguous letters. Only commas and spaces allowed as seperators.
      if (!/^(\s*[a-zA-Z]{2}\s*,?)+$/.test(rawInput)) {
        throw Error('Whoops, that won\'t work. Enter full state name(s) like "New York, Massachusetts" or state code(s) like "NY, MA"');
      } else {
        searchInput = rawInput.replace(/\s|,/g, ',');
        maxResults = $('#js-max-results').val();
        getParks(searchInput, maxResults);
      } 
    } catch(error) {
      alert(error.message);
    }
  });
}

function watchSearchResults() {
  $('#js-search-results-list').on('click', '.js-search-result-title', event => {
    event.preventDefault();
    const selectedParkID = $(event.currentTarget).attr("id"); // this is the location in the responseObj of the obj containing the selected park.
    getAccuweatherLocation(STORE.npsResponse.data[selectedParkID].latLong);
  });
}
// ===========================================================================
// ======================= QUERY FORMATTING =======================
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
// ==============================================================
// ======================== NPS API CALL ========================
function getParks(searchInput, maxResults) {
  const npsSearchURL = 'https://developer.nps.gov/api/v1/parks?';
  const npsApiKey = 'JVeSBRlmeioOK5HNO6ev6IpsIwcPWH1dXgpk2SxN';
  const params = {
    'stateCode': searchInput,
    limit: parseInt(maxResults),
    api_key: npsApiKey
  };
  const formattedQuery = formatQueryParams(params);
  const url = npsSearchURL + formattedQuery;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseObj => {
      renderParkSearchResults(responseObj, maxResults);
      STORE.npsResponse = responseObj;
      watchSearchResults();
      console.log('Here\'s the response from NPS: ', responseObj);
    })
    .catch(error => {
      $('#js-error-message').text(`Uh ho... We couldn't complete your request. Here's why: ${error.message}`);
    });
}
// ===============================================================
// ================ ACCUWEATHER LOCATION API CALL ================
function getAccuweatherLocation(parkCoordinates) {
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
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseObj => {
      // pass the location key Accuweather returns for the park's geoposition into getForeceast().
      getForecast(responseObj.Key);
      STORE.locationResponse = responseObj;
      console.log('Here\'s the response from AccuWeather\'s Location API: ', responseObj);
    })
    .catch(error => {
      $('#js-error-message').text(`Uh ho... We couldn't complete your request. Here's why: ${error.message}`);
    });
}
// ===============================================================
// ================ ACCUWEATHER FORECAST API CALL ================
function getForecast(locationKey) {
  const forecastSearchURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const forecastApiKey = '4necePoPQpKdSd2EbjAHXIotYDIna8vN';
  const url = forecastSearchURL + locationKey + '?' + 'apiKey=' + forecastApiKey;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseObj => {
      STORE.forecastResponse = responseObj;
      renderModal();
      console.log('Here\'s the response from AccuWeather\'s Forecast API: ', responseObj);
    })
    .catch(error => {
      $('#js-error-message').text(`Uh ho... We couldn't complete your request. Here's why: ${error.message}`);
    });
}
// ===========================================
// ======== DISPLAY RESULTS (ALL APIS) =======
function renderParkSearchResults(responseObj, maxResults) {
    $('#js-search-results-list').empty();
    for (let i = 0; i < maxResults && i < responseObj.data.length; i++) {
      $('#js-search-results-list').append(
        // The `ì` added as an ID to the title represents index of the object in the responseObj.data array from which the result is being displayed. 
        // This is so that other parts of the application (e.g. listeners) can easily locate the data to which this title refers.
        `<li><h3 id="${i}" class="js-search-result-title search-result-title">${responseObj.data[i].fullName}</h3>
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
}

function renderMoreParkInformation() {
  // called from renderModal
  // this function just pulls more info from NPS's response, like hiking and camping info. Or it makes another more if needed, for a diff. endpoint.
}

// ========= DOCUMENT READY ===========
$(watchSearchForm);
// ====================================