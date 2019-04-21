'use strict';
const STORE = {
  npsParksResponse: {
    "total": "21",
    "data": [
      {
        "states": "MA",
        "latLong": "lat:41.92381465, long:-70.04319832",
        "description": "The great Outer Beach described by Thoreau in the 1800s is protected within the national seashore. Forty miles of pristine sandy beach, marshes, ponds, and uplands support diverse species. Lighthouses, cultural landscapes, and wild cranberry bogs offer a glimpse of Cape Cod's past and continuing ways of life. Swimming beaches and walking and biking trails beckon today's visitors.",
        "designation": "National Seashore",
        "parkCode": "caco",
        "id": "DE0A8012-5324-4F5C-98DA-0EE6589FDFB3",
        "directionsInfo": "The national seashore is located in eastern Massachusetts and is accessed via Rt. 6. The park is 20 miles east of Hyannis, MA.",
        "directionsUrl": "http://www.nps.gov/caco/planyourvisit/directions.htm",
        "fullName": "Cape Cod National Seashore",
        "url": "https://www.nps.gov/caco/index.htm",
        "weatherInfo": "Cape Cod's weather is generally moderated by its proximity to the ocean. Winter is typically cold with some snow. Spring is often rainy. Summer is usually warm and humid. Fall is generally dry and clear.",
        "name": "Cape Cod"
      },
      {
        "states": "MA",
        "latLong": "lat:42.37698854, long:-71.12636956",
        "description": "Longfellow House-Washington's Headquarters National Historic Site preserves the home of Henry W. Longfellow, one of the world’s foremost 19th century poets. The house also served as headquarters for General George Washington during the Siege of Boston, July 1775 - April 1776. In addition to its rich history, the site offers unique opportunities to explore 19th century literature and arts.",
        "designation": "National Historic Site",
        "parkCode": "long",
        "id": "CE9470A1-A8D7-49DE-A555-1A32FBBAB0FF",
        "directionsInfo": "Longfellow House-Washington's Headquarters NHS is located in a residential section of Cambridge, MA. There is very little public parking in the area and onsite parking is limited to vehicles with handicapped parking permits. However, the site is a short walk from Harvard Square, where there are paid parking lots and a station for the MBTA Red Line and numerous bus routes. The use of public transportation to the site is highly recommended. Follow the link for detailed instructions.",
        "directionsUrl": "http://www.nps.gov/long/planyourvisit/directions.htm",
        "fullName": "Longfellow House Washington's Headquarters National Historic Site",
        "url": "https://www.nps.gov/long/index.htm",
        "weatherInfo": "New England weather is highly variable. Temperatures in the winter can be very cold with high snowfall. Fall and spring are generally pleasant. Summer temperatures are generally mild, with short periods of heat and humidity. However, the house is air conditioned and heated for collection care and the comfort of the visitor.",
        "name": "Longfellow House Washington's Headquarters"
      },
      {
        "states": "CT,MA",
        "latLong": "lat:42.37698854, long:-71.12636956",
        "description": "Discover the beauty of The Last Green Valley National Heritage Corridor!  Spanning 35 towns in northeastern Connecticut and south-central Massachusetts, The Last Green Valley is surprisingly rural and uniquely historic. With 1,100 square miles that are still 77% forests and farms, the pastoral landscape is interspersed with powerful rivers, mill villages, and vibrant town centers.",
        "designation": "National Heritage Corridor",
        "parkCode": "qush",
        "id": "95A86C84-F0CB-4493-8B7D-2369D1ED9884",
        "directionsInfo": "For details and directions to the sites within The Last Green Valley, visit, http://thelastgreenvalley.org/.",
        "directionsUrl": "http://thelastgreenvalley.org/contact-us/contact-info/",
        "fullName": "The Last Green Valley National Heritage Corridor",
        "url": "https://www.nps.gov/qush/index.htm",
        "weatherInfo": "For details and information, please visit, http://thelastgreenvalley.org/.",
        "name": "The Last Green Valley"
      }
    ],
    "limit": "2",
    "start": "1"
  }, 
  accuLocationResponse: {
    "Version": 1,
    "Key": "2089354",
    "Type": "City",
    "Rank": 85,
    "LocalizedName": "North Eastham",
    "EnglishName": "North Eastham",
    "PrimaryPostalCode": "02642",
    "Region": {
      "ID": "NAM",
      "LocalizedName": "North America",
      "EnglishName": "North America"
    },
    "Country": {
      "ID": "US",
      "LocalizedName": "United States",
      "EnglishName": "United States"
    },
    "AdministrativeArea": {
      "ID": "MA",
      "LocalizedName": "Massachusetts",
      "EnglishName": "Massachusetts",
      "Level": 1,
      "LocalizedType": "State",
      "EnglishType": "State",
      "CountryID": "US"
    },
    "TimeZone": {
      "Code": "EDT",
      "Name": "America/New_York",
      "GmtOffset": -4.0,
      "IsDaylightSaving": true,
      "NextOffsetChange": "2019-11-03T06:00:00Z"
    },
    "GeoPosition": {
      "Latitude": 41.865,
      "Longitude": -69.991,
      "Elevation": {
        "Metric": {
          "Value": 13.0,
          "Unit": "m",
          "UnitType": 5
        },
        "Imperial": {
          "Value": 42.0,
          "Unit": "ft",
          "UnitType": 0
        }
      }
    },
    "IsAlias": false,
    "SupplementalAdminAreas": [
      {
        "Level": 2,
        "LocalizedName": "Barnstable",
        "EnglishName": "Barnstable"
      }
    ],
    "DataSets": [
      "Alerts",
      "DailyAirQualityForecast",
      "DailyPollenForecast",
      "ForecastConfidence",
      "MinuteCast"
    ]
  }, 
  accuForecastResponse: {
    "Headline": {
      "EffectiveDate": "2019-04-20T20:00:00-04:00",
      "EffectiveEpochDate": 1555804800,
      "Severity": 3,
      "Text": "Expect rainy weather this evening through tomorrow morning",
      "Category": "rain",
      "EndDate": "2019-04-21T14:00:00-04:00",
      "EndEpochDate": 1555869600,
      "MobileLink": "http://m.accuweather.com/en/us/north-eastham-ma/02642/extended-weather-forecast/2089354?lang=en-us",
      "Link": "http://www.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?lang=en-us"
    },
    "DailyForecasts": [
      {
        "Date": "2019-04-20T07:00:00-04:00",
        "EpochDate": 1555758000,
        "Temperature": {
          "Minimum": {
            "Value": 52.0,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 62.0,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 7,
          "IconPhrase": "Cloudy"
        },
        "Night": {
          "Icon": 18,
          "IconPhrase": "Rain"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=1&lang=en-us"
      },
      {
        "Date": "2019-04-21T07:00:00-04:00",
        "EpochDate": 1555844400,
        "Temperature": {
          "Minimum": {
            "Value": 48.0,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 56.0,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers"
        },
        "Night": {
          "Icon": 12,
          "IconPhrase": "Showers"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=2&lang=en-us"
      },
      {
        "Date": "2019-04-22T07:00:00-04:00",
        "EpochDate": 1555930800,
        "Temperature": {
          "Minimum": {
            "Value": 45.0,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 55.0,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 12,
          "IconPhrase": "Showers"
        },
        "Night": {
          "Icon": 12,
          "IconPhrase": "Showers"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=3&lang=en-us"
      },
      {
        "Date": "2019-04-23T07:00:00-04:00",
        "EpochDate": 1556017200,
        "Temperature": {
          "Minimum": {
            "Value": 43.0,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 51.0,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 6,
          "IconPhrase": "Mostly cloudy"
        },
        "Night": {
          "Icon": 38,
          "IconPhrase": "Mostly cloudy"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=4&lang=en-us"
      },
      {
        "Date": "2019-04-24T07:00:00-04:00",
        "EpochDate": 1556103600,
        "Temperature": {
          "Minimum": {
            "Value": 43.0,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 57.0,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 7,
          "IconPhrase": "Cloudy"
        },
        "Night": {
          "Icon": 38,
          "IconPhrase": "Mostly cloudy"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/us/north-eastham-ma/02642/daily-weather-forecast/2089354?day=5&lang=en-us"
      }
    ]
  }, 
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
        <section id="js-park-planner-container" class="park-info-container">
          <p id="js-park-state-text"><strong>State(s):</strong> ${STORE.npsParksResponse.data[i].states}</p>
          <p id="js-park-description-text"><strong>Description:</strong> ${STORE.npsParksResponse.data[i].description}</p>
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
  const secondForecastDayNum = new Date(dailyForecastsArr[1].Date).getDay() -1; // This needs fixing! 
  const thirdForecastDayNum = new Date(dailyForecastsArr[2].Date).getDay() -1;
  const fourthForecastDayNum = new Date(dailyForecastsArr[3].Date).getDay() -1;
  const fifthForecastDayNum = new Date(dailyForecastsArr[4].Date).getDay() -1;
  // UPGRADE: Put weather icons in those icon slots: https://developer.accuweather.com/weather-icons (https://amancingh.com/show-weather-with-js-and-weather-api/)
  $(STORE.$this).parent().attr('id', 'selected-park-li');
  $(STORE.$this).next().html(
    `<div class="extended-nps-info-container">
      <p><strong>State(s):</strong> ${STORE.selectedPark.states}</p>
      <p><strong>Description:</strong> ${STORE.selectedPark.description}</p>
      <p><strong>Designation:</strong> ${STORE.selectedPark.designation}</p>
      <p><strong>General Climate:</strong> ${STORE.selectedPark.weatherInfo}</p>
      <p><strong>Directions:</strong> ${STORE.selectedPark.directionsInfo}<br><a href="${STORE.selectedPark.directionsUrl}">Find your way there!</a></p>
      <p><strong>Website:</strong><a href="${STORE.selectedPark.url}">Learn more about ${STORE.selectedPark.fullName}.</a></p>
    </div>
    <div class="forecast-container">
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
  AwaitParkPlannerCollapse();
}
// ======== AWAIT PARK PLANNER COLLAPSE ================
function AwaitParkPlannerCollapse() {
  // listen for clicks on the title that expanded the search result into a park planner window.
  // The target for that is STORE.$this. Make sure to call that function when and only when the planner window has been rendered. 
  $(STORE.$this).click(function(event) {
    event.preventDefault();
    $('#js-park-planner-container').empty().append(
      `<p id="js-park-state-text"><strong>State(s):</strong> ${STORE.selectedPark.states}</p>
       <p id="js-park-description-text"><strong>Description:</strong> ${STORE.selectedPark.description}</p>`
    );
    $(STORE.$this).parent().attr('id', '');
  });
}
// ========= ON DOC READY ===========
$(watchSearchForm);