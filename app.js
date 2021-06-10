import { displayLoading, hideLoading, errorText, animateNewData } from "./script.js";

let weather = {
  apiKey: "359f0831c53fa20ed2ff23f00ae0904e",

  fetchWeather(city) {
    displayLoading();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((error) => this.handleErrors(error));
  },

  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, feels_like, humidity, pressure } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerText = `${Math.floor(temp)}°C`;
    document.querySelector("#w-icon").src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
    document.querySelector("#feels-like").innerText = feels_like + " °C";
    document.querySelector("#country").innerText = country;
    document.querySelector("#humidity").innerText = humidity + "%";
    document.querySelector("#wind").innerText = speed + " km/h";
    document.querySelector("#pressure").innerText = pressure;
    document.querySelector("#temp-min").innerText = temp_min + "°C";
    document.querySelector("#temp-max").innerText = temp_max + "°C";
    document.querySelector("#description").innerText = description;
    // document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/daily?${name})`; //unsplash API
    hideLoading();
    animateNewData();
  },

  search() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

  handleErrors(error) {
    if (!navigator.onLine) {
      errorText("error: you are offline");
    } else if (document.querySelector(".search-bar").value == "") {
      errorText("error: search bar is empty");
    } else {
      errorText("error: can't get data");
    }
  },
};

document.querySelector(".search button").addEventListener("click", () => weather.search());

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") weather.search();
});

// default city
weather.fetchWeather("isfahan");

// function animate() {
//   const details = document.querySelectorAll(".details span");
//   for (let i = 0; i < details.length; i++) {
//     details[i].style.trasform = "traslateX(-50px)";
//     setTimeout(() => (details[i].style.trasform = "traslateX(0)"), 500);
//   }
// }
