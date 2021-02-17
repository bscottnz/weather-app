import '../style/main.scss';
import * as apiFncs from './apiFunctions';

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
}

getWeatherData();
