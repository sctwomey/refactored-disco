// Global Variables
let searchCityBtn = document.getElementById("brewCitySearch");
let brewCityInput = document.getElementById("brewery-city");
let searchCityHistoryButton = document.getElementById("city-history-button");
let cityHistoryContainer = document.querySelector("#city-search-history");
let searchCityHistory = [];

let searchNameBtn = document.getElementById("brewNameSearch");
let brewNameInput = document.getElementById("brewery-name");
let searchNameHistoryButton = document.getElementById("name-history-button");
let nameHistoryContainer = document.querySelector("#name-search-history");
let searchNameHistory = [];

// This saves the user input from the city search, stores it in the local storage. It also calls functions to display weather, display the list of breweries, and create search history buttons. 
searchCityBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    let searchCityStoring = toTitle(brewCityInput.value).trim();

    searchCityHistory = JSON.parse(localStorage.getItem("searchCity")) || [];
    searchCityHistory.push(searchCityStoring);

    if (searchCityHistory.length > 5) {
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
    };

});

// This saves the user input from the city search, stores it in the local storage. It also calls functions to display the list of breweries, remove to display weather, and create search history buttons.
searchNameBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    let searchNameStoring = toTitle(brewNameInput.value).trim();

    searchNameHistory = JSON.parse(localStorage.getItem("searchName")) || [];
    searchNameHistory.push(searchNameStoring);

    if (searchNameHistory.length > 5) {
        searchNameHistory.shift();
    };

    if (!searchNameStoring || undefined) {
        return;
    };

    var queryString = './search-results-name.html?by_name=' + searchNameStoring;
    location.assign(queryString);

    if (searchNameStoring !== "") {
        localStorage.setItem("searchName", JSON.stringify(searchNameHistory));
    };

});

// This is a function to convert the first letters of words to an uppercase and the rest of the letters to lowercase as in titles (from code.tutsplus.com).
function toTitle(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
};