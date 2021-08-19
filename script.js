import axios from "axios";

const KELVIN = 459.67;
const apiKey = "796615aa66205a1254376c90ff6d0826";
const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
const apiUrlGeo = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let wkDay = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[wkDay];

  return `${day} ${hours}:${minutes}`;
}

function showWeatherDetails(response) {
  //const temp = Math.round(response.data.main.temp - KELVIN);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function getNewCity(city) {
  axios.get(apiUrl(city)).then(showWeatherDetails);
}

function executeSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getNewCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios.get(apiUrlGeo(lat, lon)).then(showWeatherDetails);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 66;
//}

//function convertToCelsius(event) {
// event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 19;
//}

function main() {
  let currentDate = document.querySelector("#date");
  let currentTime = new Date();
  currentDate.innerHTML = formatDate(currentTime);

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", executeSubmit);

  let currentLocationButton = document.querySelector("#current-city-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

  //let cLink = document.querySelector("#c-link");
  //let fLink = document.querySelector("#f-link");
  //cLink.addEventListener("click", convertToCelsius);
  //fLink.addEventListener("click", convertToFahrenheit);
}

main();
