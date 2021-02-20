import '../style/main.scss';
import * as apiFncs from './apiFunctions';
import * as domFncs from './domFunctions';

const searchBox = document.querySelector('.search-box-input');
const searchIcon = document.querySelector('.search');
const displayF = document.querySelector('.weather-info__units-f');
const displayC = document.querySelector('.weather-info__units-c');
// hide data labels until the data has loaded
document.querySelector('body').style.visibility = 'hidden';
let units = 'metric';

// flags to keep track of last searched city, to re-use this info when changing units
let unitReload = false;
let lastCity = 'auckland';

// Procedural workflow function
async function getWeatherData(unit, initialLoad = false) {
  try {
    let cityName;
    // default weather on initial load
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

    if (unitReload) {
      cityName = lastCity;
    }

    lastCity = cityName;

    const requestCoordsUrl = apiFncs.buildRequestCoordsUrl(cityName);
    const coords = await apiFncs.getCoords(requestCoordsUrl);

    const requestForecastUrl = apiFncs.buildRequestForecastUrl(coords, unit);
    const weatherData = await apiFncs.getForecast(requestForecastUrl);
    weatherData.name = coords.name;
    weatherData.country = coords.country;

    // console.log(weatherData);

    // remove error msg if previous search failed
    document.querySelector('.error-msg').style.visibility = 'hidden';

    domFncs.renderWeatherData(weatherData, unit);
    // reset unit reload
    unitReload = false;

    document.querySelector('body').style.visibility = 'visible';
  } catch (err) {
    // display input search error to user
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

const dailyBtn = document.querySelector('.daily-btn');
const hourlyBtn = document.querySelector('.hourly-btn');

dailyBtn.addEventListener('click', domFncs.displayDailyForecast);

hourlyBtn.addEventListener('click', domFncs.displayHourlyForecast);

const changeHoursLeft = document.querySelector('.change-hours__left');
const changeHoursRight = document.querySelector('.change-hours__right');
let hoursPage = 1;

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

const dots = document.querySelectorAll('.dot');

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
