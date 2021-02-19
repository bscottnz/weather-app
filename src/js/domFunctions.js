import * as utils from './utils';

// changes the hour forecast display to next or previous forecasts
function changeHoursPage(hoursPage) {
  const hourForecasts = document.querySelectorAll('.forecast-hourly');
  const dots = document.querySelectorAll('.dot');
  const dot1 = document.querySelector('.dot1');
  const dot2 = document.querySelector('.dot2');
  const dot3 = document.querySelector('.dot3');

  // set all forecasts to display: none
  hourForecasts.forEach((forecast) => {
    forecast.style.display = 'none';
  });

  // remove selected styling from hour page nav dots
  dots.forEach((dot) => {
    dot.classList.remove('dot-selected');
  });

  // if hours page = 1, display first hours page
  if (hoursPage === 1) {
    document.querySelector('#current-hour-plus-1').style.display = 'block';
    document.querySelector('#current-hour-plus-2').style.display = 'block';
    document.querySelector('#current-hour-plus-3').style.display = 'block';
    document.querySelector('#current-hour-plus-4').style.display = 'block';
    document.querySelector('#current-hour-plus-5').style.display = 'block';
    document.querySelector('#current-hour-plus-6').style.display = 'block';
    document.querySelector('#current-hour-plus-7').style.display = 'block';
    document.querySelector('#current-hour-plus-8').style.display = 'block';

    dot1.classList.add('dot-selected');
  }
  // if hours page = 2, display second hours page
  if (hoursPage === 2) {
    document.querySelector('#current-hour-plus-9').style.display = 'block';
    document.querySelector('#current-hour-plus-10').style.display = 'block';
    document.querySelector('#current-hour-plus-11').style.display = 'block';
    document.querySelector('#current-hour-plus-12').style.display = 'block';
    document.querySelector('#current-hour-plus-13').style.display = 'block';
    document.querySelector('#current-hour-plus-14').style.display = 'block';
    document.querySelector('#current-hour-plus-15').style.display = 'block';
    document.querySelector('#current-hour-plus-16').style.display = 'block';

    dot2.classList.add('dot-selected');
  }

  // if hours page = 3, display third hours page
  if (hoursPage === 3) {
    document.querySelector('#current-hour-plus-17').style.display = 'block';
    document.querySelector('#current-hour-plus-18').style.display = 'block';
    document.querySelector('#current-hour-plus-19').style.display = 'block';
    document.querySelector('#current-hour-plus-20').style.display = 'block';
    document.querySelector('#current-hour-plus-21').style.display = 'block';
    document.querySelector('#current-hour-plus-22').style.display = 'block';
    document.querySelector('#current-hour-plus-23').style.display = 'block';
    document.querySelector('#current-hour-plus-24').style.display = 'block';

    dot3.classList.add('dot-selected');
  }
}

function displayDailyForecast() {
  // toggle selected button styling for different forecast buttons
  document.querySelector('.hourly-btn').classList.toggle('forecast-selected');
  document.querySelector('.daily-btn').classList.toggle('forecast-selected');

  // hide hourly forecasts
  document.querySelector('.forecast-hourly-outer-container').style.display =
    'none';

  // show daily forecast
  document.querySelector('.forecast-daily-container').style.display = 'flex';

  // hide change hourly forecast page buttons
  document.querySelector('.change-hours').style.display = 'none';
}

function displayHourlyForecast() {
  // toggle selected button styling for different forecast buttons
  document.querySelector('.hourly-btn').classList.toggle('forecast-selected');
  document.querySelector('.daily-btn').classList.toggle('forecast-selected');

  // hide daily forecasts
  document.querySelector('.forecast-daily-container').style.display = 'none';

  // show hourly forecasts
  document.querySelector('.forecast-hourly-outer-container').style.display =
    'block';

  // show change hourly forecast page buttons
  document.querySelector('.change-hours').style.display = 'flex';
}

// render top left weather data
function renderWeatherInformation(data) {
  const weatherDescription = document.querySelector(
    '.weather-info__description'
  );
  weatherDescription.textContent = utils.capitalize(
    data.current.weather[0].description
  );
  const city = document.querySelector('.weather-info__city');
  city.textContent = data.name;
  const date = document.querySelector('.weather-info__date');
  date.textContent = utils.formatDate(data.current.dt, data.timezone_offset);
  const time = document.querySelector('.weather-info__time');
  time.textContent = utils.formatTime(data.current.dt, data.timezone_offset);

  const temperature = document.querySelector('.weather-info__temperature');
  temperature.textContent = `${Math.round(data.current.temp)} °C`;
  const temperatureIcon = document.querySelector('.weather-info__icon');
  temperatureIcon.innerHTML = utils.getIcon(data.current.weather[0].icon);

  // console.log(utils.formatTime(data.current.dt, data.timezone_offset));
}

// render top right wether details
function renderWeatherDetails(data) {
  const temperatureFeelsLike = document.querySelector('#feels-like');
  const humidity = document.querySelector('#humidity');
  const chanceOfRain = document.querySelector('#chance-of-rain');
  const windSpeed = document.querySelector('#wind-speed');
}

// render daily forecast
function renderDailyForecast(data) {
  const dayPlusOneDay = document.querySelector(
    '#current-day-plus-one .forecast-daily__day'
  );
  const dayPlusTwoDay = document.querySelector(
    '#current-day-plus-two .forecast-daily__day'
  );
  const dayPlusThreeDay = document.querySelector(
    '#current-day-plus-three .forecast-daily__day'
  );
  const dayPlusFourDay = document.querySelector(
    '#current-day-plus-four .forecast-daily__day'
  );
  const dayPlusFiveDay = document.querySelector(
    '#current-day-plus-five .forecast-daily__day'
  );
  const dayPlusSixDay = document.querySelector(
    '#current-day-plus-six .forecast-daily__day'
  );
  const dayPlusSevenDay = document.querySelector(
    '#current-day-plus-seven .forecast-daily__day'
  );

  const dayPlusOneTempHigh = document.querySelector(
    '#current-day-plus-one .forecast-daily__temperature-high'
  );
  const dayPlusTwoTempHigh = document.querySelector(
    '#current-day-plus-two .forecast-daily__temperature-high'
  );
  const dayPlusThreeTempHigh = document.querySelector(
    '#current-day-plus-three .forecast-daily__temperature-high'
  );
  const dayPlusFourTempHigh = document.querySelector(
    '#current-day-plus-four .forecast-daily__temperature-high'
  );
  const dayPlusFiveTempHigh = document.querySelector(
    '#current-day-plus-five .forecast-daily__temperature-high'
  );
  const dayPlusSixTempHigh = document.querySelector(
    '#current-day-plus-six .forecast-daily__temperature-high'
  );
  const dayPlusSevenTempHigh = document.querySelector(
    '#current-day-plus-seven .forecast-daily__temperature-high'
  );

  const dayPlusOneTempLow = document.querySelector(
    '#current-day-plus-one .forecast-daily__temperature-low'
  );
  const dayPlusTwoTempLow = document.querySelector(
    '#current-day-plus-two .forecast-daily__temperature-low'
  );
  const dayPlusThreeTempLow = document.querySelector(
    '#current-day-plus-three .forecast-daily__temperature-low'
  );
  const dayPlusFourTempLow = document.querySelector(
    '#current-day-plus-four .forecast-daily__temperature-low'
  );
  const dayPlusFiveTempLow = document.querySelector(
    '#current-day-plus-five .forecast-daily__temperature-low'
  );
  const dayPlusSixTempLow = document.querySelector(
    '#current-day-plus-six .forecast-daily__temperature-low'
  );
  const dayPlusSevenTempLow = document.querySelector(
    '#current-day-plus-seven .forecast-daily__temperature-low'
  );

  const dayPlusOneIcon = document.querySelector(
    '#current-day-plus-one .forecast-daily__icon'
  );
  const dayPlusTwoIcon = document.querySelector(
    '#current-day-plus-two .forecast-daily__icon'
  );
  const dayPlusThreeIcon = document.querySelector(
    '#current-day-plus-three .forecast-daily__icon'
  );
  const dayPlusFourIcon = document.querySelector(
    '#current-day-plus-four .forecast-daily__icon'
  );
  const dayPlusFiveIcon = document.querySelector(
    '#current-day-plus-five .forecast-daily__icon'
  );
  const dayPlusSixIcon = document.querySelector(
    '#current-day-plus-six .forecast-daily__icon'
  );
  const dayPlusSevenIcon = document.querySelector(
    '#current-day-plus-seven .forecast-daily__icon'
  );
}

// render hourly forecast
function renderHourlyForecast(data) {
  const hourPlus1Time = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__day'
  );
  const hourPlus2Time = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__day'
  );
  const hourPlus3Time = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__day'
  );
  const hourPlus4Time = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__day'
  );
  const hourPlus5Time = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__day'
  );
  const hourPlus6Time = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__day'
  );
  const hourPlus7Time = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__day'
  );
  const hourPlus8Time = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__day'
  );
  const hourPlus9Time = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__day'
  );
  const hourPlus10Time = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__day'
  );
  const hourPlus11Time = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__day'
  );
  const hourPlus12Time = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__day'
  );
  const hourPlus13Time = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__day'
  );
  const hourPlus14Time = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__day'
  );
  const hourPlus15Time = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__day'
  );
  const hourPlus16Time = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__day'
  );
  const hourPlus17Time = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__day'
  );
  const hourPlus18Time = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__day'
  );
  const hourPlus19Time = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__day'
  );
  const hourPlus20Time = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__day'
  );
  const hourPlus21Time = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__day'
  );
  const hourPlus22Time = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__day'
  );
  const hourPlus23Time = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__day'
  );
  const hourPlus24Time = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__day'
  );

  const hourPlus1Temperature = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__temperature'
  );
  const hourPlus2Temperature = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__temperature'
  );
  const hourPlus3Temperature = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__temperature'
  );
  const hourPlus4Temperature = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__temperature'
  );
  const hourPlus5Temperature = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__temperature'
  );
  const hourPlus6Temperature = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__temperature'
  );
  const hourPlus7Temperature = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__temperature'
  );
  const hourPlus8Temperature = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__temperature'
  );
  const hourPlus9Temperature = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__temperature'
  );
  const hourPlus10Temperature = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__temperature'
  );
  const hourPlus11Temperature = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__temperature'
  );
  const hourPlus12Temperature = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__temperature'
  );
  const hourPlus13Temperature = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__temperature'
  );
  const hourPlus14Temperature = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__temperature'
  );
  const hourPlus15Temperature = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__temperature'
  );
  const hourPlus16Temperature = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__temperature'
  );
  const hourPlus17Temperature = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__temperature'
  );
  const hourPlus18Temperature = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__temperature'
  );
  const hourPlus19Temperature = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__temperature'
  );
  const hourPlus20Temperature = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__temperature'
  );
  const hourPlus21Temperature = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__temperature'
  );
  const hourPlus22Temperature = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__temperature'
  );
  const hourPlus23Temperature = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__temperature'
  );
  const hourPlus24Temperature = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__temperature'
  );

  const hourPlus1Icon = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__icon'
  );
  const hourPlus2Icon = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__icon'
  );
  const hourPlus3Icon = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__icon'
  );
  const hourPlus4Icon = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__icon'
  );
  const hourPlus5Icon = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__icon'
  );
  const hourPlus6Icon = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__icon'
  );
  const hourPlus7Icon = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__icon'
  );
  const hourPlus8Icon = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__icon'
  );
  const hourPlus9Icon = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__icon'
  );
  const hourPlus10Icon = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__icon'
  );
  const hourPlus11Icon = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__icon'
  );
  const hourPlus12Icon = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__icon'
  );
  const hourPlus13Icon = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__icon'
  );
  const hourPlus14Icon = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__icon'
  );
  const hourPlus15Icon = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__icon'
  );
  const hourPlus16Icon = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__icon'
  );
  const hourPlus17Icon = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__icon'
  );
  const hourPlus18Icon = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__icon'
  );
  const hourPlus19Icon = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__icon'
  );
  const hourPlus20Icon = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__icon'
  );
  const hourPlus21Icon = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__icon'
  );
  const hourPlus22Icon = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__icon'
  );
  const hourPlus23Icon = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__icon'
  );
  const hourPlus24Icon = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__icon'
  );
}

function renderWeatherData(data) {
  renderWeatherInformation(data);
  renderWeatherDetails(data);
  renderDailyForecast(data);
  renderHourlyForecast(data);
}
export {
  changeHoursPage,
  displayDailyForecast,
  displayHourlyForecast,
  renderWeatherData,
};
