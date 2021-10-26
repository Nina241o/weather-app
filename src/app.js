let now = new Date();

console.log(now);

let currentDate = document.querySelector("li .currentDate");
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes} hrs`;

function showAllCityData(response) {
  let city = response.data.name;
  console.log(response.data.name);
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
  let lowest = Math.round(response.data.main.temp_min);
  console.log(response.data.main.temp_min);
  let highest = Math.round(response.data.main.temp_max);
  console.log(response.data.main.temp_max);
  let feelsLike = response.data.main.feels_like;
  console.log(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  console.log(response.data.main.humidity);
  let windSpeed = response.data.wind.speed;
  console.log(response.data.wind.speed);
  let description = response.data.weather[0].main;
  console.log(response.data.weather[0].main);

  let cityElement = document.querySelector("ul #city");
  cityElement.innerHTML = `${city}`;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let lowestTempElement = document.querySelector("#lowest");
  lowestTempElement.innerHTML = `${lowest}`;

  let highestTempElement = document.querySelector("#highest");
  highestTempElement.innerHTML = `${highest}`;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(`${feelsLike}`);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(`${windSpeed}`);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
}

function searchCity(city) {
  let unit = `metric`;
  let apiKey = "c1a06ba25aa941d941c28ba15725e954";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showAllCityData);
}
function executeCitySubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getLocation(position) {
  let unit = `metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c1a06ba25aa941d941c28ba15725e954";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showAllCityData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", executeCitySubmission);

let currentLocationElement = document.querySelector("#current-location");
currentLocationElement.addEventListener("click", getCurrentLocation);
searchCity("Berlin");
