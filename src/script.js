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
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${cityWanted.value}`;
  let apiKey = "0198dea1996842c503892bac0bb89258";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityWanted.value}&appid=${apiKey}&units=metric`;
  axios.get(apiWeather).then(showTemperature);
}
function showTemperature(response) {
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${response.data.name}`;
  let currentTemp = document.querySelector(".currentTemp");
  let currentlyTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentlyTemp}ºC`;
}
function getcurrentLoc() {
  navigator.geolocation.getCurrentPosition(getcurrentLocation);
}
function getcurrentLocation(position) {
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `Currently there`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0198dea1996842c503892bac0bb89258";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiWeather).then(showTemperature);
}
let updateTime = document.querySelector(".time");
updateTime.innerHTML = formatDate();

let searchCityForm = document.querySelector(".search-city");
searchCityForm.addEventListener("submit", getCity);
let currentLocationTemp = document.querySelector(".btncurrent-location");
currentLocationTemp.addEventListener("click", getcurrentLoc);
