const elem = (e) => document.querySelector(e);

const loader = elem("#loading");
let skeletons = document.querySelectorAll(".skeleton");

function displayLoading() {
  loader.classList.add("display");

  setTimeout(() => {
    loader.classList.remove("display");
  }, 15000);

  for (const skeleton of skeletons) {
    skeleton.innerHTML = "";
    skeleton.classList.add("skeleton-loader");
  }
}

function hideLoading() {
  loader.classList.remove("display");

  for (const skeleton of skeletons) {
    skeleton.classList.remove("skeleton-loader");
  }
}

function showError(message) {
  const status = document.getElementById("status");
  status.style.opacity = ".7";
  status.innerHTML = `<i class='fa fa-exclamation-circle'></i>   ${message}`;
  setTimeout(() => (status.style.opacity = "0"), 4000);
}

function refreshAnimate() {
  const details = document.querySelectorAll(".details > div");
  let e = 1;
  for (let i = 0; i < details.length; i++) {
    details[i].style.opacity = "0.1";
    setTimeout(() => (details[i].style.opacity = "1"), 100 * e);
    e += 1.5;
  }
}

let weather = {
  apiKey: "359f0831c53fa20ed2ff23f00ae0904e",

  fetchWeather: function (city, lat, lon) {
    displayLoading();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((error) => this.handleErrors(error));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, feels_like, humidity, pressure } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    elem("#city").innerText = name;
    elem("#temp").innerText = `${Math.floor(temp)}°C`;
    elem("#w-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="weather-icon">`;
    elem("#feels-like").innerText = feels_like + " °C";
    elem("#country").innerText = country;
    elem("#humidity").innerText = humidity + "%";
    elem("#wind").innerText = speed + " km/h";
    elem("#pressure").innerText = pressure;
    elem("#temp-min").innerText = temp_min + "°C";
    elem("#temp-max").innerText = temp_max + "°C";
    elem("#description").innerText = description;

    hideLoading();
    refreshAnimate();
  },

  search: function () {
    this.fetchWeather(elem(".search-bar").value);
  },

  getUserLocation: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.fetchWeather("", latitude, longitude);
        },
        (err) => {
          console.error(err);
          showError("can't get current location");
          this.fetchWeather("Isfahan");
        },
        { timeout: 15000 }
      );
    } else {
      showError("Your browser doesn't support geolocation!");
    }
  },

  handleErrors: function (error) {
    hideLoading();

    elem("#country").innerHTML = `<img class="error-img" src="./img/error.png">`;

    if (!navigator.onLine) {
      showError("you are offline");
    } else if (elem(".search-bar").value == "") {
      showError("search bar is empty");
    } else {
      showError("can't get data");
    }
  },
};

elem(".search button").onclick = () => weather.search();

elem(".search-bar").onkeyup = (event) => {
  if (event.key === "Enter") weather.search();
};

//get user location
weather.getUserLocation();
