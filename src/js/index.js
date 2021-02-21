import '../style/main.scss';
import * as apiFncs from './apiFunctions';
import * as domFncs from './domFunctions';

// text input to search city
const searchBox = document.querySelector('.search-box-input');
// search icon next to search box
const searchIcon = document.querySelector('.search');
// label/link that converts to imperial units
const displayF = document.querySelector('.weather-info__units-f');
// label/link that converts to metric units
const displayC = document.querySelector('.weather-info__units-c');
// default units to metric
let units = 'metric';
// button that displays the 7 day forecast
const dailyBtn = document.querySelector('.daily-btn');
// button that displays the 24hr hourly forecast
const hourlyBtn = document.querySelector('.hourly-btn');
// button that shifts to the previous hourly forecasts
const changeHoursLeft = document.querySelector('.change-hours__left');
// button that shifts to the next hourly forecasts
const changeHoursRight = document.querySelector('.change-hours__right');
// navigation labels that show you what "page" of hourly forecasts you are viewing, as only
// 8 are displayed at any one time
const dots = document.querySelectorAll('.dot');
// display the first "page" of hourly forecasts by default
let hoursPage = 1;

// flags to keep track of last searched city, to re-use this info when changing units
let unitReload = false;
let lastCity = 'auckland';

// hide data labels until the data has loaded
document.querySelector('body').style.visibility = 'hidden';

// Procedural workflow function
async function getWeatherData(unit, initialLoad = false) {
  // try to get weather data for the city name that was input into search box
  try {
    let cityName;
    // default weather location on initial load
    if (initialLoad) {
      cityName = 'auckland';
    } else {
      // if not initial load, get relevent weather data
      cityName = apiFncs.getDataFromForm();
    }

    // if no name entered, exit function
    if (!cityName) {
      return;
    }

    // when changing display between metric and imperial units, the data must refresh with a new api call
    // that uses those new units. when the units are changed, unitReload is set to true and then the
    // getWeatherData function is fired. if unitReload is true, then we want to search for the same city
    // as the previous one.
    if (unitReload) {
      cityName = lastCity;
    }

    // keep track of the last searched city, so when refreshing the data with changed units
    // the same current city will be searched for.
    lastCity = cityName;

    // get coordinates of searched city
    const requestCoordsUrl = apiFncs.buildRequestCoordsUrl(cityName);
    const coords = await apiFncs.getCoords(requestCoordsUrl);

    // get weather data of supplied coordinates
    const requestForecastUrl = apiFncs.buildRequestForecastUrl(coords, unit);
    const weatherData = await apiFncs.getForecast(requestForecastUrl);

    // copy some data over from the coordinates data over to the new data
    weatherData.name = coords.name;
    weatherData.country = coords.country;

    // remove error msg if previous search failed
    document.querySelector('.error-msg').style.visibility = 'hidden';

    // extract relevent data from the returned api object and display it
    // to the dom. the unit paramater specifies whether or not to display
    // temperature in C or F.
    domFncs.renderWeatherData(weatherData, unit);
    // reset unit reload
    unitReload = false;

    // on initial load, body is set to invisble. when the data is ready to be displayed,
    // set the body to visible.
    document.querySelector('body').style.visibility = 'visible';
  } catch (err) {
    // display input search error to user if the searched location does not return
    // any weather data
    document.querySelector('.error-msg').style.visibility = 'visible';
  }

  // clear search box
  document.querySelector('.search-box-input').value = '';
}

// intial load
getWeatherData(units, true);

searchIcon.addEventListener('click', () => {
  getWeatherData(units);
});

searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeatherData(units);
  }
});

dailyBtn.addEventListener('click', domFncs.displayDailyForecast);

hourlyBtn.addEventListener('click', domFncs.displayHourlyForecast);

// if not on the fist page, go to previous page
changeHoursLeft.addEventListener('click', () => {
  if (hoursPage > 1) {
    hoursPage--;
    domFncs.changeHoursPage(hoursPage);
  }
});

// if not on the last page, go to next page
changeHoursRight.addEventListener('click', () => {
  if (hoursPage < 3) {
    hoursPage++;
    domFncs.changeHoursPage(hoursPage);
  }
});

// navigation dots for changing hours page
dots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    hoursPage = parseInt(e.target.dataset.dot, 10);
    domFncs.changeHoursPage(hoursPage);
  });
});

// toggle degrees c / degrees f
displayC.addEventListener('click', async () => {
  units = 'metric';
  unitReload = true;
  await getWeatherData(units, true);

  displayC.style.display = 'none';
  displayF.style.display = 'block';
});

displayF.addEventListener('click', async () => {
  units = 'imperial';
  unitReload = true;
  await getWeatherData(units, true);

  displayF.style.display = 'none';
  displayC.style.display = 'block';
});
