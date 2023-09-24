// Global Variables
let weatherApiKey = '45cbba5c85dfa674bf1c6440aa5d1deb';
let currentWeatherEl = document.querySelector("#current-weather");

let searchNameBtn = document.getElementById("brewNameSearch");
let brewNameInput = document.getElementById("brewery-name");
let searchNameHistoryButton = document.getElementById("name-history-button");
let nameHistoryContainer = document.querySelector("#name-search-history");
let searchNameHistory = [];

let clearHistoryButton = document.getElementById("clear-history");


function getNameParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchNameParams = document.location.search.split('?by_name=');

    // Get the query and format values
    var name = searchNameParams[1].split('=').pop();

    getBreweriesByName(name);
};

// This GETs the list of breweries by city from the API.
async function getBreweriesByName(searchNameStoring) {
    let brewNameUrl = 'https://api.openbrewerydb.org/v1/breweries?by_name=' + searchNameStoring;

    console.log("Name Url: ", brewNameUrl);

    try {
        const response = await fetch(
            brewNameUrl,
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

// This retrieves the saved information from local storage from the names search, and creates a button to retrive that information.
function namesSearched() {

    let namesSearched = JSON.parse(localStorage.getItem("searchName")) || [];

    nameHistoryContainer.innerHTML = "";

    for (let i = 0; i < namesSearched.length; i++) {
        let buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "btn btn-secondary m-1");
        buttonEl.innerHTML = namesSearched[i];
        buttonEl.addEventListener('click', function (event) {
            event.preventDefault();
            getBreweriesByName(event.target.innerHTML);
        });
        nameHistoryContainer.append(buttonEl);
    };
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
        "<h1>" + city + " (" + date + ") " + "<img src='" +
        iconUrl + "' alt='" + data.weather[0].description +
        "'></h1>" + "<p>Temperature: " + temp + " &deg;F</p>" +
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

// This clears the the local storage and refreshes the webpage.
let clearSearchHistory = function () {
    localStorage.clear();
    location.reload();
};

//This calls the clear local storage function when the button "Clear History" button is clicked.
clearHistoryButton.addEventListener("click", clearSearchHistory);

namesSearched();
getNameParams();