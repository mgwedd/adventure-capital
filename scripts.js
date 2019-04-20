'use strict';
const STORE = {
  npsParksResponse: {}, 
  accuLocationResponse: {}, 
  accuForecastResponse: {}, 
  selectedPark: {},   
}
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
    const selectedParkID = $(this).attr("data-park-index"); // This is the location in the responseObj of the obj containing the selected park.
    STORE.selectedPark = STORE.npsParksResponse.data[selectedParkID];
    try {
      getAccuLocation();
      getAccuForecast();
      renderParkPlanner();
    } catch(error) {
      alert(`Darn. The interweb broke, and we couldn't get more info about this park right now :(. Please choose another park.`);
      console.log(`Here's what went wrong: ${error.message}`);
    }
  });
}
// ======================= QUERY FORMATTING =======================
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
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
    STORE.npsParksResponse = await npsResponse.json();
    renderParkSearchResults(maxResults);
    watchSearchResults();
    console.log('Here\'s the response from NPS: ', STORE.npsParksResponse);
    } catch(error) {
      $('#js-error-message').text(`Uh ho... We couldn't complete your request to NPS's API (/Parks endpoint). Here's why: ${error.message}`);
    }
}
// ================ ACCUWEATHER LOCATION API CALL ================
async function getAccuLocation() {
  const LocationSearchURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';
  const locationAPIKey = '4necePoPQpKdSd2EbjAHXIotYDIna8vN';
  const formattedParkCoordinates = STORE.selectedPark.latLong.replace(/lat:|\slong:/, ''); 
  const params = {
    apiKey: locationAPIKey, 
    q: formattedParkCoordinates
  };
  const request = new Request(LocationSearchURL + formatQueryParams(params));
  const headers = new Headers({
      'Accept': '*/*', 
      'Accept-Encoding': 'gzip', 
      'Accept-Language': 'en-US', 
      'DNT': '1', 
      'Host': 'dataservice.accuweather.com', 
    });
  try {
    const locationResponse = await fetch(request, headers); 
    if (!locationResponse.ok) {
      throw new Error(locationResponse.statusText);
    }
    // pass the location key Accuweather returns for the park's geoposition into getForeceast().
    STORE.accuLocationResponse = await locationResponse.json();
    getForecast(STORE.accuLocationResponse.Key);
    console.log('Here\'s the response from AccuWeather\'s Location API: ', STORE.accuLocationResponse);
  } catch(error) {
    $('#js-error-message').text(`Uh ho... We couldn't complete your request to Accuweather's Location API. Here's why: ${error.message}`);
  }
}
// ================ ACCUWEATHER FORECAST API CALL ================
async function getAccuForecast() {
  const forecastSearchURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const forecastApiKey = '4necePoPQpKdSd2EbjAHXIotYDIna8vN';
  const forecastUrl = forecastSearchURL + STORE.accuLocationResponse.Key + '?' + 'apiKey=' + forecastApiKey;

  const request = new Request(forecastUrl);
  const headers = new Headers({
      'Accept': '*/*', 
      'Accept-Encoding': 'gzip', 
      'Accept-Language': 'en-US', 
      'DNT': '1', 
      'Host': 'dataservice.accuweather.com', 
    });

  try {
    const forecastResponse = await fetch(request, headers);
    if (!forecastResponse.ok) {
      throw new Error(forecastResponse.statusText);
    }
    STORE.accuForecastResponse = await forecastResponse.json();;
    renderParkPlanner();
    console.log('Here\'s the response from AccuWeather\'s Forecast API: ', STORE.accuForecastResponse);
  } catch(error) {
    $('#js-error-message').text(`Uh ho... We couldn't complete your request to Accuweather's 5 Forecast API. Here's why: ${error.message}`);
  }
}
// ======== DISPLAY RESULTS (ALL APIS) ================
function renderParkSearchResults(maxResults) {
    $('#js-search-results-list').empty();
    for (let i = 0; i < maxResults && i < STORE.npsParksResponse.data.length; i++) {
      $('#js-search-results-list').append(
        // The `ì` added as a data attr represents index of the object in the responseObj.data array from which the result is being displayed. 
        // This is so that other parts of the application (e.g. listeners) can easily locate the data to which this title refers.
        `<li>
        <h3 data-park-index="${i}" class="js-search-result-title search-result-title">${STORE.npsParksResponse.data[i].fullName}</h3>
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
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const firstForecastDayNum = new Date(STORE.accuForecastResponse.DailyForecasts[0].Date).getDay() -1; // 0-indexed for weekdays arr
  const secondForecastDayNum = new Date(STORE.accuForecastResponse.DailyForecasts[1].Date).getDay() -1;
  const thirdForecastDayNum = new Date(STORE.accuForecastResponse.DailyForecasts[2].Date).getDay() -1;
  const fourthForecastDayNum = new Date(STORE.accuForecastResponse.DailyForecasts[3].Date).getDay() -1;
  const fifthForecastDayNum = new Date(STORE.accuForecastResponse.DailyForecasts[4].Date).getDay() -1;
  $('#js-park-planner-container').empty();
  // UPGRADE: Put weather icons in those icon slots: https://developer.accuweather.com/weather-icons (https://amancingh.com/show-weather-with-js-and-weather-api/)
  $('#js-park-info-container').html(
    `<div class="extended-nps-info-container>
      <p><strong>State(s):</strong> ${STORE.selectedPark.states}</p>
      <p><strong>Description:</strong> ${STORE.selectedPark.description}</p>
      <p><strong>Designation:</strong> ${STORE.selectedPark.designation}</p>
      <p><strong>General Climate:</strong> ${STORE.selectedPark.weatherInfo}</p>
      <p><strong>Directions:</strong> ${STORE.selectedPark.directionsInfo} <a href="${STORE.selectedPark.directionsUrl}">Find your way there!</a></p>
      <p><strong>Website:</strong> <a href="${STORE.selectedPark.url}">Learn more about the park.</a></p>
    </div>
    <div class="forecast-container">
      <div class="day-container">
        <span class="forecast-day">${weekdays[firstForecastDayNum]}</span>
        <span class="forecast-phrase">${STORE.accuForecastResponse.DailyForecasts[0].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${STORE.accuForecastResponse.DailyForecasts[0].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${STORE.accuForecastResponse.DailyForecasts[0].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[secondForecastDayNum]}</span>
        <span class="forecast-phrase">${STORE.accuForecastResponse.DailyForecasts[1].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${STORE.accuForecastResponse.DailyForecasts[1].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${STORE.accuForecastResponse.DailyForecasts[1].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[thirdForecastDayNum]}</span>
        <span class="forecast-phrase">${STORE.accuForecastResponse.DailyForecasts[2].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${STORE.accuForecastResponse.DailyForecasts[2].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${STORE.accuForecastResponse.DailyForecasts[2].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[fourthForecastDayNum]}</span>
        <span class="forecast-phrase">${STORE.accuForecastResponse.DailyForecasts[3].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${STORE.accuForecastResponse.DailyForecasts[3].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${STORE.accuForecastResponse.DailyForecasts[3].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[fifthForecastDayNum]}</span>
        <span class="forecast-phrase">${STORE.accuForecastResponse.DailyForecasts[4].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${STORE.accuForecastResponse.DailyForecasts[4].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${STORE.accuForecastResponse.DailyForecasts[4].Temperature.Maximum.Value}&#8457;</span>
      </div>
    </div>`
  ); 
}

// ========= DOCUMENT READY ===========
$(watchSearchForm);