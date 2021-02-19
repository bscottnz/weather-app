import '../style/main.scss';
import * as apiFncs from './apiFunctions';
import * as domFncs from './domFunctions';

// Procedural workflow function
async function getWeatherData() {
  const cityName = apiFncs.getDataFromForm();

  const requestCoordsUrl = apiFncs.buildRequestCoordsUrl(cityName);
  const coords = await apiFncs.getCoords(requestCoordsUrl);

  const requestForecastUrl = apiFncs.buildRequestForecastUrl(coords);
  const weatherData = await apiFncs.getForecast(requestForecastUrl);
  weatherData.name = coords.name;
  weatherData.country = coords.country;
  apiFncs.formatWeatherData(weatherData);
  console.log(weatherData);
  // console.log(weatherData.current.weather[0].description);
  domFncs.renderWeatherData(weatherData);
}

getWeatherData();

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
