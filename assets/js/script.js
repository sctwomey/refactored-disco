// Global Variables
let searchCityBtn = document.getElementById("brewCitySearch");
let brewCityInput = document.getElementById("brewery-city");
let searchCityHistoryButton = document.getElementById("city-history-button");
let cityHistoryContainer = document.querySelector("#city-search-history");
let searchCityHistory = [];

let weatherApiKey = '45cbba5c85dfa674bf1c6440aa5d1deb';
let currentWeatherEl = document.querySelector("#current-weather");

let searchNameBtn = document.getElementById("brewNameSearch");
let brewNameInput = document.getElementById("brewery-name");
let searchNameHistoryButton = document.getElementById("name-history-button");
let nameHistoryContainer = document.querySelector("#name-search-history");
let searchNameHistory = [];

let clearHistoryButton = document.getElementById("clear-history");

// This saves the user input from the city search, stores it in the local storage. It also calls functions to display weather, display the list of breweries, and create search history buttons. 
searchCityBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    let searchCityStoring = toTitle(brewCityInput.value).trim();

    if (!searchCityHistory.includes(searchCityStoring)) {
        searchCityHistory.push(searchCityStoring);
    };

    if (searchCityHistory.length > 10) {
        searchCityHistory.shift();
    };

    if (!searchCityStoring || undefined) {
        return;
    };

    var queryString = './search-results-city.html?by_city=' + searchCityStoring;
    location.assign(queryString);

    console.log(queryString);

    if (searchCityStoring !== "") {
        localStorage.setItem("searchCity", JSON.stringify(searchCityHistory));
        citiesSearched(brewCityInput.value);
        getBreweriesByCity(searchCityStoring);
        searchWeather(searchCityStoring);
    };

});

// This saves the user input from the city search, stores it in the local storage. It also calls functions to display the list of breweries, remove to display weather, and create search history buttons.
searchNameBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    let searchNameStoring = toTitle(brewNameInput.value).trim();

    if (!searchNameHistory.includes(searchNameStoring)) {
        searchNameHistory.push(searchNameStoring);
    };

    if (searchNameHistory.length > 10) {
        searchNameHistory.shift();
    };

    if (!searchNameStoring || undefined) {
        return;
    };

    var queryString = './search-results-name.html?by_name=' + searchNameStoring;
    location.assign(queryString);

    if (searchNameStoring !== "") {
        localStorage.setItem("searchName", JSON.stringify(searchNameHistory));
        namesSearched(brewNameInput.value);
        getBreweriesByName(searchNameStoring);
        currentWeatherEl.replaceChildren();
    };

});

// This function searches for cities from the weather data from the API.
function searchWeather(brewCityInput) {
    // Current weather API URL
    let currentWeatherApiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        brewCityInput +
        "&appid=" +
        weatherApiKey +
        "&units=imperial";

    // This GETs/Fetches the current weather data from the API.
    fetch(currentWeatherApiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    // This calls the display function for the current weather data.
                    displayCurrentWeather(data);
                    console.log(displayCurrentWeather());
                });
            } else {
                console.log("Error: " + response.statusText);
            }
        });
};

// This function displays the current weather data.
function displayCurrentWeather(data) {
    let city = data.name;
    let date = new Date(data.dt * 1000).toLocaleDateString();
    let iconUrl =
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;

    let html =
        "<h2>" + city + "</h2>" + "<h3> (" + date + ") </h3>" + "<img src='" +
        iconUrl + "' alt='" + data.weather[0].description +
        "'>" + "<p>Temperature: " + temp + " &deg;F</p>" +
        "<p>Humidity: " + humidity + "%</p>" + "<p>Wind Speed: " +
        windSpeed + " mph</p>";

    currentWeatherEl.innerHTML = (html);
    currentWeatherEl.classList.add("current-weather");
};

// This is a function to convert the first letters of words to an uppercase and the rest of the letters to lowercase as in titles (from code.tutsplus.com).
function toTitle(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
};