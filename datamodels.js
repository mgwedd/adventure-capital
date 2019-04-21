// 20190420222032
// https://developer.nps.gov/api/v1/parks?stateCode=MA&limit=2&api_key=JVeSBRlmeioOK5HNO6ev6IpsIwcPWH1dXgpk2SxN

const npsresponse = {
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
        "latLong": "",
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
  }

  const locationResponse = // 20190420222235
  // https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=4necePoPQpKdSd2EbjAHXIotYDIna8vN&q=41.92381465,-70.04319832
  
  {
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
  }

  const forecastResponse = // 20190420222306
  // https://dataservice.accuweather.com/forecasts/v1/daily/5day/2089354?apikey=4necePoPQpKdSd2EbjAHXIotYDIna8vN
  
  {
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
  }