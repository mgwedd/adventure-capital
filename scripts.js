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
    try {
      const selectedParkID = parseInt($(this).attr("data-park-index")); // This is the location in the responseObj of the obj containing the selected park.
      STORE.selectedPark = STORE.npsParksResponse.data[selectedParkID];
      STORE.$this = $(this);
      // Check whether the selected park has geocordinates. Some don't because they're too spread out to have a central point of georeference.
      // If the park does have geocordinates, then fetch a weather forecast for it (because you can). That chain calls the nps + weather renderer
      if (STORE.selectedPark.latLong !== '') {
        getAccuLocation();
      // Else, the park doesn't have geocoordinates, so we can't get weather, so just display more info from NPS.
      } else {
        renderParkPlannerNoWeather();
      }
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
  const parkLatLong = STORE.selectedPark.latLong.replace(/[lat:long\s]/g, ''); 
  const requestURL = locationSearchURL + 'apikey=' + accuAPIKey + '&q=' + parkLatLong; 
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
    STORE.accuLocationResponse = await locationResponse.json(); // Forecast API needs Accuweather's in-house location codes.
    getAccuForecast();
    console.log('Here\'s the response from AccuWeather\'s Location API: ', STORE.accuLocationResponse);
    console.log('current state in getAccuLocaton: ', STORE)
  } catch(error) {
    $('#js-error-message').text(`Uh ho... Something went wrong when fetching weather forecasts. Please try another park.`);
    console.log(`Here's the error message from the Accuweather API calls: ${error.message}`)
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
    renderParkPlannerWithForecast();
    console.log('Here\'s the response from AccuWeather\'s Forecast API: ', STORE.accuForecastResponse);
  } catch(error) {
    $('#js-error-message').text(`Uh ho... Something went wrong when fetching a weather forecast for the park you chose. Please try another one!`);
    console.log(`Here's what went wrong when fetching the weather forecast: ${error.message}`)
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
        <section class="park-info-container">
          <h3 data-park-index="${i}" id="js-search-result-title" class="search-result-title">${STORE.npsParksResponse.data[i].fullName}</h3>
          <p id="js-park-state-text"><strong>State(s):</strong> ${STORE.npsParksResponse.data[i].states}</p>
          <p id="js-park-description-text"><strong>Description:</strong> ${STORE.npsParksResponse.data[i].description}</p>
          <div></div>
        </section>
        </li>`
      );
    }
    $('#js-search-results').removeClass('hidden');
}
// ======== DISPLAY PARK PLANNER (WITH AND WITHOUT WEATHER FORECAST (No Geocordinates edge case)) ================
function renderParkPlannerWithForecast() {
  console.log('current state in renderParkPlanner, right before the date time selection: ', STORE)
  const dailyForecastsArr = STORE.accuForecastResponse.DailyForecasts;
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const firstForecastDayNum = new Date(dailyForecastsArr[0].Date).getDay(); // 0-indexed for weekdays arr
  const secondForecastDayNum = new Date(dailyForecastsArr[1].Date).getDay(); // BUG: This needs fixing! first day is always undefined.
  const thirdForecastDayNum = new Date(dailyForecastsArr[2].Date).getDay();
  const fourthForecastDayNum = new Date(dailyForecastsArr[3].Date).getDay();
  const fifthForecastDayNum = new Date(dailyForecastsArr[4].Date).getDay();
  $(STORE.$this).parent().attr('id', 'selected-park-li');
  $(STORE.$this).next().hide();
  $(STORE.$this).next().next().hide();
  $(STORE.$this).next().next().next().html(
      `<div class="forecast-container"> 
          <div class="day-container">
            <p class="forecast-day">Today</p>
            <img src="assets/weather-icons/${dailyForecastsArr[0].Day.Icon}.png" alt="${dailyForecastsArr[0].Day.IconPhrase}" class="forecast-icon">
            <p class="forecast-temp">${dailyForecastsArr[0].Temperature.Minimum.Value}&#8457 - ${dailyForecastsArr[0].Temperature.Maximum.Value}&#8457;</p>
          </div>
          <div class="day-container">
            <p class="forecast-day">${weekdays[secondForecastDayNum]}</p>
            <img src="assets/weather-icons/${dailyForecastsArr[1].Day.Icon}.png" alt="${dailyForecastsArr[1].Day.IconPhrase}" class="forecast-icon">
            <p class="forecast-temp">${dailyForecastsArr[1].Temperature.Minimum.Value}&#8457 - ${dailyForecastsArr[1].Temperature.Maximum.Value}&#8457;</p>
          </div>
          <div class="day-container">
            <p class="forecast-day">${weekdays[thirdForecastDayNum]}</p>
            <img src="assets/weather-icons/${dailyForecastsArr[2].Day.Icon}.png" alt="${dailyForecastsArr[2].Day.IconPhrase}" class="forecast-icon">
            <p class="forecast-temp">${dailyForecastsArr[2].Temperature.Minimum.Value}&#8457 - ${dailyForecastsArr[2].Temperature.Maximum.Value}&#8457;</p>
          </div>
          <div class="day-container">
            <p class="forecast-day">${weekdays[fourthForecastDayNum]}</p>
            <img src="assets/weather-icons/${dailyForecastsArr[3].Day.Icon}.png" alt="${dailyForecastsArr[2].Day.IconPhrase}" class="forecast-icon">
            <p class="forecast-temp">${dailyForecastsArr[3].Temperature.Minimum.Value}&#8457 - ${dailyForecastsArr[3].Temperature.Maximum.Value}&#8457;</p>
          </div>
          <div class="day-container">
            <p class="forecast-day">${weekdays[fifthForecastDayNum]}</p>
            <img src="assets/weather-icons/${dailyForecastsArr[4].Day.Icon}.png" alt="${dailyForecastsArr[4].Day.IconPhrase}" class="forecast-icon">
            <p class="forecast-temp">${dailyForecastsArr[4].Temperature.Minimum.Value}&#8457 - ${dailyForecastsArr[4].Temperature.Maximum.Value}&#8457;</p>
          </div>
        </div>
    <div class="extended-nps-container">
      <p><strong>State(s):</strong> ${STORE.selectedPark.states}</p>
      <p><strong>Description:</strong> ${STORE.selectedPark.description}</p>
      <p><strong>Designation:</strong> ${STORE.selectedPark.designation}</p>
      <p><strong>General Climate:</strong> ${STORE.selectedPark.weatherInfo}</p>
      <p><strong>Directions:</strong> ${STORE.selectedPark.directionsInfo}</p>
    </div>
    <a class="park-directions-button" href="${STORE.selectedPark.directionsUrl}" target="_blank">Get Directions</a>`
  ); 
}
function renderParkPlannerNoWeather() {
  console.log('current state in renderParkPlanner, right before displaying more info: ', STORE)
  $(STORE.$this).parent().attr('id', 'selected-park-li');
  $(STORE.$this).next().hide();
  $(STORE.$this).next().next().hide();
  $(STORE.$this).next().next().next().html(
    `<div class="extended-nps-container">
      <p><strong>State(s):</strong> ${STORE.selectedPark.states}</p>
      <p><strong>Description:</strong> ${STORE.selectedPark.description}</p>
      <p><strong>Designation:</strong> ${STORE.selectedPark.designation}</p>
      <p><strong>General Climate:</strong> ${STORE.selectedPark.weatherInfo}</p>
      <p><strong>Directions:</strong> ${STORE.selectedPark.directionsInfo}</p>
  </div>
  <a class="park-directions-button" href="${STORE.selectedPark.directionsUrl}" target="_blank">Get Directions</a>`
  ); 
}
// ========= ON DOC READY ===========
$(watchSearchForm);