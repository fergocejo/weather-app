getCurrentPosition();
function changeDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
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
  }

  axios
    .get(`${endPoint}q=${cityInput.value}&units=metric&appid=${key}`)
    .then(showTemperature);
}

function convertC(event) {
  event.preventDefault();
  let key = "1715ef1ee9d3809a0dd19d7a98ef749d";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let cityInput = document.querySelector("#city-input");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureF = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperatureF - 32) * (5 / 9));
}

function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(celsiusTemperature * (9 / 5) + 32);
}

function showPosition(position) {
  let key = "1715ef1ee9d3809a0dd19d7a98ef749d";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);

  axios
    .get(`${endPoint}lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
    .then(showCurrent);
}

function showCurrent(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  console.log(response.data);
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
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
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
