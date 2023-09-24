// Global Variables
let searchCityBtn = document.getElementById("brewCitySearch");
let brewCityInput = document.getElementById("brewery-city");
let searchCityHistoryButton = document.getElementById("city-history-button");
let cityHistoryContainer = document.querySelector("#city-search-history");
let searchCityHistory = [];

let weatherApiKey = '45cbba5c85dfa674bf1c6440aa5d1deb';
let currentWeatherEl = document.querySelector("#current-weather");

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let clearHistoryButton = document.getElementById("clear-history");


function getCityParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchCityParams = document.location.search.split('?by_city=');

    // Get the city values
    var city = searchCityParams[1].split('=').pop();

    getBreweriesByCity(city);

};

// This GETs the list of breweries by city from the API.
async function getBreweriesByCity(searchCityStoring) {
    let brewCityUrl = 'https://api.openbrewerydb.org/v1/breweries?by_city=' + searchCityStoring;

    let currentWeatherApiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchCityStoring +
        "&appid=" +
        weatherApiKey + "&units=imperial";

    fetch(currentWeatherApiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    // This calls the display function for the current weather data.
                    displayCurrentWeather(data);

                });
            } else {
                console.log("Error: " + response.status);
            }
        });

    try {
        const response = await fetch(
            brewCityUrl,
            {
                method: 'GET',
            },
        );

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        };

        const data = await response.json();
        createList(data);

        return data;

    } catch (error) {
        console.log(error);
    };

};

// This creates the list of elements to display the list of breweries on the webpage.
function createList(data) {

    const ol = document.createElement('ol');

    data.forEach(brewery => {
        const li = document.createElement('li');
        li.innerHTML = `${brewery.name}`;

        li.style.fontSize = '22px';


        const ul = document.createElement('ul');

        const city = document.createElement('li');
        city.innerHTML = `City: ${brewery.city}`;

        const state = document.createElement('li');
        state.innerHTML = `State: ${brewery.state}`;

        const country = document.createElement('li');
        country.innerHTML = `Country: ${brewery.country}`;

        ul.append(...[city, state, country]);

        li.appendChild(ul);

        ol.appendChild(li);
    });

    const container = document.getElementById('results-container');
    container.innerHTML = "";
    container.appendChild(ol);

};

// This retrieves the saved information from local storage from the cities search, and creates a button to retrieve that information.
function citiesSearched() {

    let citiesSearched = JSON.parse(localStorage.getItem("searchCity")) || [];

    cityHistoryContainer.innerHTML = "";

    for (let i = 0; i < citiesSearched.length; i++) {
        let buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "btn btn-secondary m-1");
        buttonEl.innerHTML = citiesSearched[i];
        buttonEl.addEventListener('click', function (event) {
            event.preventDefault();
            getBreweriesByCity(event.target.innerHTML);
            currentWeatherEl.replaceChildren();
        });
        cityHistoryContainer.append(buttonEl);
    };

};

// This function displays the current weather data.
function displayCurrentWeather(data) {
    let city = data.name;
    let date = new Date(data.dt * 1000).toLocaleDateString('en-US', options);
    let iconUrl =
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;

    let html =
        "<h1>" + city + "<br> <h4>(" + date + ")</h4> " + "<img src='" +
        iconUrl + "' alt='" + data.weather[0].description +
        "'></h1>" + "<p>Temperature: " + temp + " &deg;F</p>" +
        "<p>Humidity: " + humidity + "%</p>" + "<p>Wind Speed: " +
        windSpeed + " mph</p>";

    currentWeatherEl.innerHTML = html;
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

// This clears the the local storage and refreshes the webpage.
let clearSearchHistory = function () {
    localStorage.clear();
    location.reload();
};

//This calls the clear local storage function when the button "Clear History" button is clicked.
clearHistoryButton.addEventListener("click", clearSearchHistory);

citiesSearched();
getCityParams();
