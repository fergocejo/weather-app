getCurrentPosition();
function changeDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  console.log(date);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function changeCity(event) {
  event.preventDefault();
  let key = "1715ef1ee9d3809a0dd19d7a98ef749d";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let cityInput = document.querySelector("#city-input");
  let tittle = document.querySelector("#city");

  tittle.innerHTML = cityInput.value;

  function showTemperature(response) {
    let temp = Math.round(response.data.main.temp);

    let description = response.data.weather[0].description;
    let humidityelement = response.data.main.humidity;
    let windelement = response.data.wind.speed;
    let iconElement = document.querySelector("#icon");
    celsiusTemperature = Math.round(response.data.main.temp);

    document.querySelector("#temperature").innerHTML = temp;
    document.querySelector("#description").innerHTML = description;
    document.querySelector("#humidity").innerHTML = humidityelement;
    document.querySelector("#wind").innerHTML = windelement;

    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
  }

  axios
    .get(`${endPoint}q=${cityInput.value}&units=metric&appid=${key}`)
    .then(showTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1715ef1ee9d3809a0dd19d7a98ef749d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function convertC(event) {
  event.preventDefault();
  let key = "1715ef1ee9d3809a0dd19d7a98ef749d";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let cityInput = document.querySelector("#city-input");
  let temperatureElement = document.querySelector("#temperature");
  farenheit.classList.remove("active");
  celsius.classList.add("active");
  temperatureElement.innerHTML = celsiusTemperature;
}

function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  farenheit.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature * (9 / 5) + 32);
}

function showPosition(position) {
  let key = "1715ef1ee9d3809a0dd19d7a98ef749d";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(`${endPoint}lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
    .then(showCurrent);
}

function showCurrent(response) {
  document.querySelector("h1").innerHTML = `${response.data.name}`;

  let temp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidityelement = response.data.main.humidity;
  let windelement = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temp;
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#humidity").innerHTML = humidityelement;
  document.querySelector("#wind").innerHTML = windelement;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `    
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastday.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastday.weather[0].icon
                  }.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastday.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastday.temp.min
                  )}° </span>
                </div>
              </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `<div>`;

  forecastElement.innerHTML = forecastHTML;
}

let newDay = document.querySelector("#date");
let currentTime = new Date();
newDay.innerHTML = changeDay(currentTime);

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", changeCity);

let celsiusTemperature = null;

let celsius = document.querySelector("#c");
celsius.addEventListener("click", convertC);

let farenheit = document.querySelector("#f");
farenheit.addEventListener("click", convertF);

let button = document.querySelector("#currentTemp");
button.addEventListener("click", getCurrentPosition);
