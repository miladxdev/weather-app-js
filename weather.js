let weather = {

    apiKey: "359f0831c53fa20ed2ff23f00ae0904e",

    fetchWeather: function () {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=esfahan&units=metric&appid=359f0831c53fa20ed2ff23f00ae0904e")
        .then(response => response.json())
        .then(data => console.log(data));
    }
};