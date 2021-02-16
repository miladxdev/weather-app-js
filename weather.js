let weather = {

    apiKey: "359f0831c53fa20ed2ff23f00ae0904e",

    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=metric&appid=" + this.apiKey
        )
        .then(response => response.json()) // get response and parse to json
        .then(data => this.displayWeather(data)); // Data is an object. ( data.main.temp => returns temp)
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(`${name} ${description} ${temp}`);

        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = `${temp}°C`;
        document.querySelector(".icon").src = "icon/static/cloudy-day-1.svg";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = `humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `wind: ${speed} km/h`;

    }
};