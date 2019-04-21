'use strict';
const STORE = {
  npsParksResponse: {},
  accuLocationResponse: {}, 
  accuForecastResponse: {}, 
  selectedPark: {},
  $this: {}
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
  // No arrow function used here because of incorrect binding with $this.
  $('#js-search-results-list').on('click', '#js-search-result-title', function(event) {
    event.preventDefault();
    const selectedParkID = parseInt($(this).attr("data-park-index")); // This is the location in the responseObj of the obj containing the selected park.
    STORE.selectedPark = STORE.npsParksResponse.data[selectedParkID];
    try {
    getAccuLocation();
    STORE.$this = $(this);
    console.log('current state in watchSearchResults: ', STORE)
        } catch(error) {
      alert(`Darn. The interweb broke behind the scenes, and we couldn't get more info about that park right now :(. Please choose another park.`);
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
    console.log('current state in getParks: ', STORE)
    renderParkSearchResults(maxResults);
    watchSearchResults();
    console.log('Here\'s the response from NPS: ', STORE.npsParksResponse);
    } catch(error) {
      $('#js-error-message').text(`Uh ho... We couldn't complete your request to NPS's API (/Parks endpoint). Here's why: ${error.message}`);
    }
}
// ================ ACCUWEATHER LOCATION API CALL ================
async function getAccuLocation() {
  const locationSearchURL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';
  const accuAPIKey = '4necePoPQpKdSd2EbjAHXIotYDIna8vN';
  const parkLatLon = STORE.selectedPark.latLong.replace(/[lat:long\s]/g, ''); 
  const requestURL = locationSearchURL + 'apikey=' + accuAPIKey + '&q=' + parkLatLon; 
  const request = new Request(requestURL);
  const headers = new Headers({
      'mode': 'no-cors',
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
    STORE.accuLocationResponse = await locationResponse.json(); // Forecast API needs Accuweather's in-house location code.
    getAccuForecast();
    console.log('Here\'s the response from AccuWeather\'s Location API: ', STORE.accuLocationResponse);
    console.log('current state in getAccuLocaton: ', STORE)
  } catch(error) {
    $('#js-error-message').text(`Uh ho... We couldn't complete your request to Accuweather's Location API. Here's why: ${error.message}`);
  }
}
// ================ ACCUWEATHER FORECAST API CALL ================
async function getAccuForecast() {
  const forecastSearchURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const accuAPIKey = '4necePoPQpKdSd2EbjAHXIotYDIna8vN';
  const forecastUrl = forecastSearchURL + STORE.accuLocationResponse.Key + '?apikey=' + accuAPIKey;

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
    STORE.accuForecastResponse = await forecastResponse.json();
    renderParkPlanner();
    console.log('Here\'s the response from AccuWeather\'s Forecast API: ', STORE.accuForecastResponse);
    console.log('current state in getAccuForecast: ', STORE)
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
        <h3 data-park-index="${i}" id="js-search-result-title" class="search-result-title">${STORE.npsParksResponse.data[i].fullName}</h3>
        <section class="park-info-container">
          <p id="js-park-state-text"><strong>State(s):</strong> ${STORE.npsParksResponse.data[i].states}</p>
          <p id="js-park-description-text"><strong>Description:</strong> ${STORE.npsParksResponse.data[i].description}</p>
          <div id="js-park-planner-collapsible-container" class="park-planner-collapsible-container"></div>
          </section>
        </li>`
      );
    }
    $('#js-search-results').removeClass('hidden');
}
// <img src="${STORE.npsParksResponse.data[i].images[0].url}" alt="a picture of the national park: ${STORE.npsParksResponse.data[i].fullName}">
// ======== DISPLAY PARK PLANNER ================
function renderParkPlanner() {
  console.log('current state in renderParkPlanner, right before the date time selection: ', STORE)
  const dailyForecastsArr = STORE.accuForecastResponse.DailyForecasts;
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const firstForecastDayNum = new Date(dailyForecastsArr[0].Date).getDay() -1; // 0-indexed for weekdays arr
  const secondForecastDayNum = new Date(dailyForecastsArr[1].Date).getDay() -1; // BUG: This needs fixing! first day is always undefined.
  const thirdForecastDayNum = new Date(dailyForecastsArr[2].Date).getDay() -1;
  const fourthForecastDayNum = new Date(dailyForecastsArr[3].Date).getDay() -1;
  const fifthForecastDayNum = new Date(dailyForecastsArr[4].Date).getDay() -1;
  // UPGRADE: Put weather icons in those icon slots: https://developer.accuweather.com/weather-icons (https://amancingh.com/show-weather-with-js-and-weather-api/)
  $(STORE.$this).parent().attr('id', 'selected-park-li');
  $(STORE.$this).next().html(
    `<div class="extended-nps-container">
      <p><strong>Designation:</strong> ${STORE.selectedPark.designation}</p>
      <p><strong>General Climate:</strong> ${STORE.selectedPark.weatherInfo}</p>
      <p><strong>Directions:</strong> ${STORE.selectedPark.directionsInfo}<br><br><a href="${STORE.selectedPark.directionsUrl}" target="_blank">Directions to the Park</a><br><br></p>
      <p><strong>Website: </strong><a href="${STORE.selectedPark.url}" target="_blank">${STORE.selectedPark.fullName}</a></p>
    </div>
    <div class="forecast-container">
      <h3 class="forecast-title">Weather Forecast</h3>  
      <div class="day-container">
        <span class="forecast-day">${weekdays[firstForecastDayNum]}</span>
        <span class="forecast-phrase">${dailyForecastsArr[0].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${dailyForecastsArr[0].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${dailyForecastsArr[0].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[secondForecastDayNum]}</span>
        <span class="forecast-phrase">${dailyForecastsArr[1].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${dailyForecastsArr[1].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${dailyForecastsArr[1].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[thirdForecastDayNum]}</span>
        <span class="forecast-phrase">${dailyForecastsArr[2].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${dailyForecastsArr[2].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${dailyForecastsArr[2].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[fourthForecastDayNum]}</span>
        <span class="forecast-phrase">${dailyForecastsArr[3].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${dailyForecastsArr[3].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${dailyForecastsArr[3].Temperature.Maximum.Value}&#8457;</span>
      </div>
      <div class="day-container">
        <span class="forecast-day">${weekdays[fifthForecastDayNum]}</span>
        <span class="forecast-phrase">${dailyForecastsArr[4].Day.IconPhrase}</span>
        <span class="forecast-min">Low: ${dailyForecastsArr[4].Temperature.Minimum.Value}&#8457;</span>
        <span class="forecast-max">High: ${dailyForecastsArr[4].Temperature.Maximum.Value}&#8457;</span>
      </div>
    </div>`
  ); 
  parkPlannerToggle();
}
// ======== PLANNER PLANNER TOGGLE ================
function parkPlannerToggle() {
  $(STORE.$this).click(function(event) {
    $('#js-park-planner-collapsible-container').slideToggle( 'slow', function() {});
  });
}
    // $(STORE.$this).parent().attr('id', '');
// ========= ON DOC READY ===========
$(watchSearchForm);