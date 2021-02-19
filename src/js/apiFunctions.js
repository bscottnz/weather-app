import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

// Gets city name from form
function getDataFromForm() {
  const cityName = 'pirongia';
  // remove whitespace for the api call
  return cityName.replace(/\s/g, '');
}

// To get full weather data, 2 API requests need to be made. The current weather response returns
// coordinates, which can then be used to make a request for the full forecast.

// Builds request url to obtain coordinates
function buildRequestCoordsUrl(cityName) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=20f7632ffc2c022654e4093c6947b4f4`;
}

// Builds request url to obtain weather forecast
function buildRequestForecastUrl(coordinates) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=metric&appid=20f7632ffc2c022654e4093c6947b4f4`;
}

// Returns coordinates and city name for a specified city name.
async function getCoords(url) {
  const response = await fetch(url);
  const weatherData = await response.json();
  const { coord } = weatherData;
  coord.name = weatherData.name;
  coord.country = weatherData.sys.country;
  console.log(weatherData);
  // console.log(weatherData.weather);

  return coord;
}

// Returns forecast data for specified coordinates.
async function getForecast(url) {
  const response = await fetch(url);
  const forecastData = await response.json();

  return forecastData;
}

// Format weather data
function formatWeatherData(data) {
  const unixTime = data.current.dt;
  const localTime = fromUnixTime(unixTime);
  // console.log(format(localTime, 'yyyyMMdd'));
  // Convert current time, sunrise and sunset from unix to regular date time.
  // data.current
}

export {
  getDataFromForm,
  buildRequestCoordsUrl,
  buildRequestForecastUrl,
  getCoords,
  getForecast,
  formatWeatherData,
};
