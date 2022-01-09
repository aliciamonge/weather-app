function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let weekday = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let month = months[now.getMonth()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = `${weekday} ${hour}:${minutes}`;
  return currentDate;
}
function getCity(event) {
  event.preventDefault();
  let cityWanted = document.querySelector("#city-wanted");
  let apiKey = "0198dea1996842c503892bac0bb89258";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityWanted.value}&appid=${apiKey}&units=metric`;
  axios.get(apiWeather).then(showNowTemperature);
}
function getForecast(coordinates) {
  let apiKey = "0198dea1996842c503892bac0bb89258";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showNowTemperature(response) {
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let currentTemp = document.querySelector(".currentTemp");
  let currentlyTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentlyTemp}º`;
  let currentTempMax = document.querySelector(".current-max-temp");
  let currentlyTempMax = Math.round(response.data.main.temp_max);
  currentTempMax.innerHTML = `${currentlyTempMax}ºC`;
  let currentTempMin = document.querySelector(".current-min-temp");
  let currentlyTempMin = Math.round(response.data.main.temp_min);
  currentTempMin.innerHTML = `${currentlyTempMin}ºC`;
  let currentHumidity = document.querySelector(".current-humidity");
  let currentlyHumidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `${currentlyHumidity}`;
  let currentSky = document.querySelector(".current-sky");
  let currentlySky = `${response.data.weather[0].description}`;
  currentSky.innerHTML = `${currentlySky}`;
  let currentWind = document.querySelector(".current-wind");
  let currentlyWind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `Wind: ${currentlyWind} km/h`;
  let changeIcon = document.querySelector("#icon");
  changeIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}
function displayForecast() {}
function getcurrentLoc() {
  navigator.geolocation.getCurrentPosition(getcurrentLocation);
}
function getcurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0198dea1996842c503892bac0bb89258";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiWeather).then(showNowTemperature);
}
function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}º`;
  fahrenheitTemperature.classList.add("active");
  celsiusTemp.classList.remove("active");
}
function showCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${Math.round(celsiusTemperature)}º`;
  fahrenheitTemperature.classList.remove("active");
  celsiusTemp.classList.add("active");
}
let celsiusTemperature = null;
let updateTime = document.querySelector(".time");
updateTime.innerHTML = formatDate();

let searchCityForm = document.querySelector(".search-city");
searchCityForm.addEventListener("submit", getCity);

let currentLocationTemp = document.querySelector(".btncurrent-location");
currentLocationTemp.addEventListener("click", getcurrentLoc);

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", showCelsius);
