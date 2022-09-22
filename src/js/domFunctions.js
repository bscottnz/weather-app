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
    document.querySelector('#current-hour-plus-1').style.display = 'flex';
    document.querySelector('#current-hour-plus-2').style.display = 'flex';
    document.querySelector('#current-hour-plus-3').style.display = 'flex';
    document.querySelector('#current-hour-plus-4').style.display = 'flex';
    document.querySelector('#current-hour-plus-5').style.display = 'flex';
    document.querySelector('#current-hour-plus-6').style.display = 'flex';
    document.querySelector('#current-hour-plus-7').style.display = 'flex';
    document.querySelector('#current-hour-plus-8').style.display = 'flex';

    dot1.classList.add('dot-selected');
  }
  // if hours page = 2, display second hours page
  if (hoursPage === 2) {
    document.querySelector('#current-hour-plus-9').style.display = 'flex';
    document.querySelector('#current-hour-plus-10').style.display = 'flex';
    document.querySelector('#current-hour-plus-11').style.display = 'flex';
    document.querySelector('#current-hour-plus-12').style.display = 'flex';
    document.querySelector('#current-hour-plus-13').style.display = 'flex';
    document.querySelector('#current-hour-plus-14').style.display = 'flex';
    document.querySelector('#current-hour-plus-15').style.display = 'flex';
    document.querySelector('#current-hour-plus-16').style.display = 'flex';

    dot2.classList.add('dot-selected');
  }

  // if hours page = 3, display third hours page
  if (hoursPage === 3) {
    document.querySelector('#current-hour-plus-17').style.display = 'flex';
    document.querySelector('#current-hour-plus-18').style.display = 'flex';
    document.querySelector('#current-hour-plus-19').style.display = 'flex';
    document.querySelector('#current-hour-plus-20').style.display = 'flex';
    document.querySelector('#current-hour-plus-21').style.display = 'flex';
    document.querySelector('#current-hour-plus-22').style.display = 'flex';
    document.querySelector('#current-hour-plus-23').style.display = 'flex';
    document.querySelector('#current-hour-plus-24').style.display = 'flex';

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
function renderWeatherInformation(data, units) {
  let tempUnit = '°C';

  if (units === 'imperial') {
    tempUnit = '°F';
  }
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
  temperature.textContent = `${Math.round(data.current.temp)} ${tempUnit}`;
  const temperatureIcon = document.querySelector('.weather-info__icon');
  temperatureIcon.innerHTML = utils.getIcon(data.current.weather[0].icon);
}

// render top right wether details
function renderWeatherDetails(data, units) {
  let tempUnit = '°C';
  let speedUnit = 'km/h';

  if (units === 'imperial') {
    tempUnit = '°F';
    speedUnit = 'mph';
  }

  // convert windspeed from meters per second to km/h
  if (units === 'metric') {
    data.current.wind_speed *= 3.6;
  }

  const temperatureFeelsLike = document.querySelector('#feels-like');

  temperatureFeelsLike.textContent = `${Math.round(
    data.current.feels_like
  )} ${tempUnit}`;

  const humidity = document.querySelector('#humidity');
  humidity.textContent = `${data.current.humidity} %`;
  const chanceOfRain = document.querySelector('#chance-of-rain');
  chanceOfRain.textContent = `${data.daily[0].pop *100} %`;
  const windSpeed = document.querySelector('#wind-speed');
  // round to 1 decimal place
  windSpeed.textContent = `${
    Math.round(data.current.wind_speed * 10) / 10
  } ${speedUnit}`;
}

// render daily forecast
function renderDailyForecast(data, units) {
  let tempUnit = '°C';

  if (units === 'imperial') {
    tempUnit = '°F';
  }

  // ##############################
  // render the day of week name
  // ##############################
  const dayPlusOneDay = document.querySelector(
    '#current-day-plus-one .forecast-daily__day'
  );

  dayPlusOneDay.textContent = utils.formatDate(
    data.daily[1].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusTwoDay = document.querySelector(
    '#current-day-plus-two .forecast-daily__day'
  );
  dayPlusTwoDay.textContent = utils.formatDate(
    data.daily[2].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusThreeDay = document.querySelector(
    '#current-day-plus-three .forecast-daily__day'
  );
  dayPlusThreeDay.textContent = utils.formatDate(
    data.daily[3].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusFourDay = document.querySelector(
    '#current-day-plus-four .forecast-daily__day'
  );
  dayPlusFourDay.textContent = utils.formatDate(
    data.daily[4].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusFiveDay = document.querySelector(
    '#current-day-plus-five .forecast-daily__day'
  );
  dayPlusFiveDay.textContent = utils.formatDate(
    data.daily[5].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusSixDay = document.querySelector(
    '#current-day-plus-six .forecast-daily__day'
  );
  dayPlusSixDay.textContent = utils.formatDate(
    data.daily[6].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusSevenDay = document.querySelector(
    '#current-day-plus-seven .forecast-daily__day'
  );
  dayPlusSevenDay.textContent = utils.formatDate(
    data.daily[7].dt,
    data.timezone_offset,
    'day'
  );

  // ##############################
  // render daily high temperature
  // ##############################
  const dayPlusOneTempHigh = document.querySelector(
    '#current-day-plus-one .forecast-daily__temperature-high'
  );
  dayPlusOneTempHigh.textContent = `${Math.round(
    data.daily[1].temp.max
  )} ${tempUnit}`;

  const dayPlusTwoTempHigh = document.querySelector(
    '#current-day-plus-two .forecast-daily__temperature-high'
  );
  dayPlusTwoTempHigh.textContent = `${Math.round(
    data.daily[2].temp.max
  )} ${tempUnit}`;

  const dayPlusThreeTempHigh = document.querySelector(
    '#current-day-plus-three .forecast-daily__temperature-high'
  );
  dayPlusThreeTempHigh.textContent = `${Math.round(
    data.daily[3].temp.max
  )} ${tempUnit}`;

  const dayPlusFourTempHigh = document.querySelector(
    '#current-day-plus-four .forecast-daily__temperature-high'
  );
  dayPlusFourTempHigh.textContent = `${Math.round(
    data.daily[4].temp.max
  )} ${tempUnit}`;

  const dayPlusFiveTempHigh = document.querySelector(
    '#current-day-plus-five .forecast-daily__temperature-high'
  );
  dayPlusFiveTempHigh.textContent = `${Math.round(
    data.daily[5].temp.max
  )} ${tempUnit}`;

  const dayPlusSixTempHigh = document.querySelector(
    '#current-day-plus-six .forecast-daily__temperature-high'
  );
  dayPlusSixTempHigh.textContent = `${Math.round(
    data.daily[6].temp.max
  )} ${tempUnit}`;

  const dayPlusSevenTempHigh = document.querySelector(
    '#current-day-plus-seven .forecast-daily__temperature-high'
  );
  dayPlusSevenTempHigh.textContent = `${Math.round(
    data.daily[7].temp.max
  )} ${tempUnit}`;

  // ##############################
  // render daily low temperature
  // ##############################
  const dayPlusOneTempLow = document.querySelector(
    '#current-day-plus-one .forecast-daily__temperature-low'
  );
  dayPlusOneTempLow.textContent = `${Math.round(
    data.daily[1].temp.min
  )} ${tempUnit}`;

  const dayPlusTwoTempLow = document.querySelector(
    '#current-day-plus-two .forecast-daily__temperature-low'
  );
  dayPlusTwoTempLow.textContent = `${Math.round(
    data.daily[2].temp.min
  )} ${tempUnit}`;

  const dayPlusThreeTempLow = document.querySelector(
    '#current-day-plus-three .forecast-daily__temperature-low'
  );
  dayPlusThreeTempLow.textContent = `${Math.round(
    data.daily[3].temp.min
  )} ${tempUnit}`;

  const dayPlusFourTempLow = document.querySelector(
    '#current-day-plus-four .forecast-daily__temperature-low'
  );
  dayPlusFourTempLow.textContent = `${Math.round(
    data.daily[4].temp.min
  )} ${tempUnit}`;

  const dayPlusFiveTempLow = document.querySelector(
    '#current-day-plus-five .forecast-daily__temperature-low'
  );
  dayPlusFiveTempLow.textContent = `${Math.round(
    data.daily[5].temp.min
  )} ${tempUnit}`;

  const dayPlusSixTempLow = document.querySelector(
    '#current-day-plus-six .forecast-daily__temperature-low'
  );
  dayPlusSixTempLow.textContent = `${Math.round(
    data.daily[6].temp.min
  )} ${tempUnit}`;

  const dayPlusSevenTempLow = document.querySelector(
    '#current-day-plus-seven .forecast-daily__temperature-low'
  );
  dayPlusSevenTempLow.textContent = `${Math.round(
    data.daily[7].temp.min
  )} ${tempUnit}`;

  // ##############################
  // render daily weather icon
  // ##############################
  const dayPlusOneIcon = document.querySelector(
    '#current-day-plus-one .forecast-daily__icon'
  );
  dayPlusOneIcon.innerHTML = utils.getIcon(data.daily[1].weather[0].icon);

  const dayPlusTwoIcon = document.querySelector(
    '#current-day-plus-two .forecast-daily__icon'
  );
  dayPlusTwoIcon.innerHTML = utils.getIcon(data.daily[2].weather[0].icon);

  const dayPlusThreeIcon = document.querySelector(
    '#current-day-plus-three .forecast-daily__icon'
  );
  dayPlusThreeIcon.innerHTML = utils.getIcon(data.daily[3].weather[0].icon);

  const dayPlusFourIcon = document.querySelector(
    '#current-day-plus-four .forecast-daily__icon'
  );
  dayPlusFourIcon.innerHTML = utils.getIcon(data.daily[4].weather[0].icon);

  const dayPlusFiveIcon = document.querySelector(
    '#current-day-plus-five .forecast-daily__icon'
  );
  dayPlusFiveIcon.innerHTML = utils.getIcon(data.daily[5].weather[0].icon);

  const dayPlusSixIcon = document.querySelector(
    '#current-day-plus-six .forecast-daily__icon'
  );
  dayPlusSixIcon.innerHTML = utils.getIcon(data.daily[6].weather[0].icon);

  const dayPlusSevenIcon = document.querySelector(
    '#current-day-plus-seven .forecast-daily__icon'
  );
  dayPlusSevenIcon.innerHTML = utils.getIcon(data.daily[7].weather[0].icon);
}

// render hourly forecast
function renderHourlyForecast(data, units) {
  let tempUnit = '°C';

  if (units === 'imperial') {
    tempUnit = '°F';
  }

  // ##############################
  // render hourly time
  // ##############################
  const hourPlus1Time = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__day'
  );
  hourPlus1Time.textContent = utils.formatTime(
    data.hourly[1].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus2Time = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__day'
  );
  hourPlus2Time.textContent = utils.formatTime(
    data.hourly[2].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus3Time = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__day'
  );
  hourPlus3Time.textContent = utils.formatTime(
    data.hourly[3].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus4Time = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__day'
  );
  hourPlus4Time.textContent = utils.formatTime(
    data.hourly[4].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus5Time = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__day'
  );
  hourPlus5Time.textContent = utils.formatTime(
    data.hourly[5].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus6Time = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__day'
  );
  hourPlus6Time.textContent = utils.formatTime(
    data.hourly[6].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus7Time = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__day'
  );
  hourPlus7Time.textContent = utils.formatTime(
    data.hourly[7].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus8Time = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__day'
  );
  hourPlus8Time.textContent = utils.formatTime(
    data.hourly[8].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus9Time = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__day'
  );
  hourPlus9Time.textContent = utils.formatTime(
    data.hourly[9].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus10Time = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__day'
  );
  hourPlus10Time.textContent = utils.formatTime(
    data.hourly[10].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus11Time = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__day'
  );
  hourPlus11Time.textContent = utils.formatTime(
    data.hourly[11].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus12Time = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__day'
  );
  hourPlus12Time.textContent = utils.formatTime(
    data.hourly[12].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus13Time = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__day'
  );
  hourPlus13Time.textContent = utils.formatTime(
    data.hourly[13].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus14Time = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__day'
  );
  hourPlus14Time.textContent = utils.formatTime(
    data.hourly[14].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus15Time = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__day'
  );
  hourPlus15Time.textContent = utils.formatTime(
    data.hourly[15].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus16Time = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__day'
  );
  hourPlus16Time.textContent = utils.formatTime(
    data.hourly[16].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus17Time = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__day'
  );
  hourPlus17Time.textContent = utils.formatTime(
    data.hourly[17].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus18Time = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__day'
  );
  hourPlus18Time.textContent = utils.formatTime(
    data.hourly[18].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus19Time = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__day'
  );
  hourPlus19Time.textContent = utils.formatTime(
    data.hourly[19].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus20Time = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__day'
  );
  hourPlus20Time.textContent = utils.formatTime(
    data.hourly[20].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus21Time = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__day'
  );
  hourPlus21Time.textContent = utils.formatTime(
    data.hourly[21].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus22Time = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__day'
  );
  hourPlus22Time.textContent = utils.formatTime(
    data.hourly[22].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus23Time = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__day'
  );
  hourPlus23Time.textContent = utils.formatTime(
    data.hourly[23].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus24Time = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__day'
  );
  hourPlus24Time.textContent = utils.formatTime(
    data.hourly[24].dt,
    data.timezone_offset,
    'hour'
  );

  // ##############################
  // render hourly temperature
  // ##############################

  const hourPlus1Temperature = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__temperature-high'
  );
  hourPlus1Temperature.textContent = `${Math.round(
    data.hourly[1].temp
  )} ${tempUnit}`;

  const hourPlus2Temperature = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__temperature-high'
  );
  hourPlus2Temperature.textContent = `${Math.round(
    data.hourly[2].temp
  )} ${tempUnit}`;

  const hourPlus3Temperature = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__temperature-high'
  );
  hourPlus3Temperature.textContent = `${Math.round(
    data.hourly[3].temp
  )} ${tempUnit}`;

  const hourPlus4Temperature = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__temperature-high'
  );
  hourPlus4Temperature.textContent = `${Math.round(
    data.hourly[4].temp
  )} ${tempUnit}`;

  const hourPlus5Temperature = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__temperature-high'
  );
  hourPlus5Temperature.textContent = `${Math.round(
    data.hourly[5].temp
  )} ${tempUnit}`;

  const hourPlus6Temperature = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__temperature-high'
  );
  hourPlus6Temperature.textContent = `${Math.round(
    data.hourly[6].temp
  )} ${tempUnit}`;

  const hourPlus7Temperature = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__temperature-high'
  );
  hourPlus7Temperature.textContent = `${Math.round(
    data.hourly[7].temp
  )} ${tempUnit}`;

  const hourPlus8Temperature = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__temperature-high'
  );
  hourPlus8Temperature.textContent = `${Math.round(
    data.hourly[8].temp
  )} ${tempUnit}`;

  const hourPlus9Temperature = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__temperature-high'
  );
  hourPlus9Temperature.textContent = `${Math.round(
    data.hourly[9].temp
  )} ${tempUnit}`;

  const hourPlus10Temperature = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__temperature-high'
  );
  hourPlus10Temperature.textContent = `${Math.round(
    data.hourly[10].temp
  )} ${tempUnit}`;

  const hourPlus11Temperature = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__temperature-high'
  );
  hourPlus11Temperature.textContent = `${Math.round(
    data.hourly[11].temp
  )} ${tempUnit}`;

  const hourPlus12Temperature = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__temperature-high'
  );
  hourPlus12Temperature.textContent = `${Math.round(
    data.hourly[12].temp
  )} ${tempUnit}`;

  const hourPlus13Temperature = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__temperature-high'
  );
  hourPlus13Temperature.textContent = `${Math.round(
    data.hourly[13].temp
  )} ${tempUnit}`;

  const hourPlus14Temperature = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__temperature-high'
  );
  hourPlus14Temperature.textContent = `${Math.round(
    data.hourly[14].temp
  )} ${tempUnit}`;

  const hourPlus15Temperature = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__temperature-high'
  );
  hourPlus15Temperature.textContent = `${Math.round(
    data.hourly[15].temp
  )} ${tempUnit}`;

  const hourPlus16Temperature = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__temperature-high'
  );
  hourPlus16Temperature.textContent = `${Math.round(
    data.hourly[16].temp
  )} ${tempUnit}`;

  const hourPlus17Temperature = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__temperature-high'
  );
  hourPlus17Temperature.textContent = `${Math.round(
    data.hourly[17].temp
  )} ${tempUnit}`;

  const hourPlus18Temperature = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__temperature-high'
  );
  hourPlus18Temperature.textContent = `${Math.round(
    data.hourly[18].temp
  )} ${tempUnit}`;

  const hourPlus19Temperature = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__temperature-high'
  );
  hourPlus19Temperature.textContent = `${Math.round(
    data.hourly[19].temp
  )} ${tempUnit}`;

  const hourPlus20Temperature = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__temperature-high'
  );
  hourPlus20Temperature.textContent = `${Math.round(
    data.hourly[20].temp
  )} ${tempUnit}`;

  const hourPlus21Temperature = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__temperature-high'
  );
  hourPlus21Temperature.textContent = `${Math.round(
    data.hourly[21].temp
  )} ${tempUnit}`;

  const hourPlus22Temperature = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__temperature-high'
  );
  hourPlus22Temperature.textContent = `${Math.round(
    data.hourly[22].temp
  )} ${tempUnit}`;

  const hourPlus23Temperature = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__temperature-high'
  );
  hourPlus23Temperature.textContent = `${Math.round(
    data.hourly[23].temp
  )} ${tempUnit}`;

  const hourPlus24Temperature = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__temperature-high'
  );
  hourPlus24Temperature.textContent = `${Math.round(
    data.hourly[24].temp
  )} ${tempUnit}`;

  // ##############################
  // render hourly weather icon
  // ##############################

  const hourPlus1Icon = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__icon'
  );
  hourPlus1Icon.innerHTML = utils.getIcon(data.hourly[1].weather[0].icon);

  const hourPlus2Icon = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__icon'
  );
  hourPlus2Icon.innerHTML = utils.getIcon(data.hourly[2].weather[0].icon);

  const hourPlus3Icon = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__icon'
  );
  hourPlus3Icon.innerHTML = utils.getIcon(data.hourly[3].weather[0].icon);

  const hourPlus4Icon = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__icon'
  );
  hourPlus4Icon.innerHTML = utils.getIcon(data.hourly[4].weather[0].icon);

  const hourPlus5Icon = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__icon'
  );
  hourPlus5Icon.innerHTML = utils.getIcon(data.hourly[5].weather[0].icon);

  const hourPlus6Icon = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__icon'
  );
  hourPlus6Icon.innerHTML = utils.getIcon(data.hourly[6].weather[0].icon);

  const hourPlus7Icon = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__icon'
  );
  hourPlus7Icon.innerHTML = utils.getIcon(data.hourly[7].weather[0].icon);

  const hourPlus8Icon = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__icon'
  );
  hourPlus8Icon.innerHTML = utils.getIcon(data.hourly[8].weather[0].icon);

  const hourPlus9Icon = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__icon'
  );
  hourPlus9Icon.innerHTML = utils.getIcon(data.hourly[9].weather[0].icon);

  const hourPlus10Icon = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__icon'
  );
  hourPlus10Icon.innerHTML = utils.getIcon(data.hourly[10].weather[0].icon);

  const hourPlus11Icon = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__icon'
  );
  hourPlus11Icon.innerHTML = utils.getIcon(data.hourly[11].weather[0].icon);

  const hourPlus12Icon = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__icon'
  );
  hourPlus12Icon.innerHTML = utils.getIcon(data.hourly[12].weather[0].icon);

  const hourPlus13Icon = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__icon'
  );
  hourPlus13Icon.innerHTML = utils.getIcon(data.hourly[13].weather[0].icon);

  const hourPlus14Icon = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__icon'
  );
  hourPlus14Icon.innerHTML = utils.getIcon(data.hourly[14].weather[0].icon);

  const hourPlus15Icon = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__icon'
  );
  hourPlus15Icon.innerHTML = utils.getIcon(data.hourly[15].weather[0].icon);

  const hourPlus16Icon = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__icon'
  );
  hourPlus16Icon.innerHTML = utils.getIcon(data.hourly[16].weather[0].icon);

  const hourPlus17Icon = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__icon'
  );
  hourPlus17Icon.innerHTML = utils.getIcon(data.hourly[17].weather[0].icon);

  const hourPlus18Icon = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__icon'
  );
  hourPlus18Icon.innerHTML = utils.getIcon(data.hourly[18].weather[0].icon);

  const hourPlus19Icon = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__icon'
  );
  hourPlus19Icon.innerHTML = utils.getIcon(data.hourly[19].weather[0].icon);

  const hourPlus20Icon = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__icon'
  );
  hourPlus20Icon.innerHTML = utils.getIcon(data.hourly[20].weather[0].icon);

  const hourPlus21Icon = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__icon'
  );
  hourPlus21Icon.innerHTML = utils.getIcon(data.hourly[21].weather[0].icon);

  const hourPlus22Icon = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__icon'
  );
  hourPlus22Icon.innerHTML = utils.getIcon(data.hourly[22].weather[0].icon);

  const hourPlus23Icon = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__icon'
  );
  hourPlus23Icon.innerHTML = utils.getIcon(data.hourly[23].weather[0].icon);

  const hourPlus24Icon = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__icon'
  );
  hourPlus24Icon.innerHTML = utils.getIcon(data.hourly[24].weather[0].icon);
}

function renderWeatherData(data, units) {
  renderWeatherInformation(data, units);
  renderWeatherDetails(data, units);
  renderDailyForecast(data, units);
  renderHourlyForecast(data, units);
}
export {
  changeHoursPage,
  displayDailyForecast,
  displayHourlyForecast,
  renderWeatherData,
};
