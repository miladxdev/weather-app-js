
let weather = {

    apiKey: "359f0831c53fa20ed2ff23f00ae0904e",
    
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid=" + this.apiKey)
        .then(response => response.json()) // get response and parse to json
        .then(data => this.displayWeather(data)); // Data is an object. ( data.main.temp => returns temp)
        
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_min, temp_max, feels_like, humidity, pressure } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        console.log(country);
        // console.log(`${name} ${description} ${temp}`);
        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = `${Math.floor(temp)}°C`;
        // document.querySelector(".icon").src = "icon/static/cloudy-day-1.svg";
        document.querySelector("#feels-like").innerText = feels_like+' °C';
        document.querySelector("#country").innerText = country;
        document.querySelector("#humidity").innerText = humidity + "%";
        document.querySelector("#wind").innerText = speed + ' km/h';
        document.querySelector("#pressure").innerText = pressure;
        document.querySelector("#temp-min").innerText = temp_min+'°C';
        document.querySelector("#temp-max").innerText = temp_max+'°C';
        document.querySelector("#description").innerText = description;

        // document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/daily?${name})`; //unsplash API
    },

    search: function () {
        // this.fetchWeather('isfahan');
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});


document.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
