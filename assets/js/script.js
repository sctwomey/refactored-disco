
let searchCityBtn = document.getElementById("brewCitySearch");
let brewCityInput = document.getElementById("brewery-city");
let searchCityHistoryButton = document.getElementById("city-history-button");
let searchCityHistoryContainer = document.querySelector("#city-search-history");
let searchCityHistory = [];

let searchNameBtn = document.getElementById("brewNameSearch");
let brewNameInput = document.getElementById("brewery-name");
let searchNameHistoryButton = document.getElementById("name-history-button");
let searchNameHistoryContainer = document.querySelector("#name-search-history");
let searchNameHistory = [];

let clearHistoryButton = document.getElementById("clear-history");

searchCityBtn.addEventListener('click', function (event) {
    event.preventDefault();

    var searchCityStoring = brewCityInput.value;
    searchCityHistory.push(searchCityStoring);

    if (searchCityHistory.length > 10) {
        searchCityHistory.shift();
    };

    if (!searchCityStoring || undefined) {
        return;
    }

    localStorage.setItem("searchCity", JSON.stringify(searchCityHistory));

    getBreweriesByCity(searchCityStoring);
});

async function getBreweriesByCity(searchCityStoring) {
    var brewCityUrl = 'https://api.openbrewerydb.org/v1/breweries?by_city=' + searchCityStoring;

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

searchNameBtn.addEventListener('click', function (event) {
    event.preventDefault();

    var searchNameStoring = brewNameInput.value;
    searchNameHistory.push(searchNameStoring);

    if (searchNameHistory.length > 10) {
        searchNameHistory.shift();
    };

    if (!searchNameStoring || undefined) {
        return;
    }

    localStorage.setItem("searchName", JSON.stringify(searchNameHistory));

    getBreweriesByName(searchNameStoring);
});

async function getBreweriesByName(searchNameStoring) {
    var brewNameUrl = 'https://api.openbrewerydb.org/v1/breweries?by_name=' + searchNameStoring;

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

    const container = document.getElementById('container');
    container.innerHTML = "";
    container.appendChild(ol);

};

let citiesSearched = function () {

    let citiesSearched = localStorage.getItem("searchCity");

    if (!citiesSearched) {
        return;
    };

    citiesSearched = JSON.parse(citiesSearched);

    for (let i = 0; i < citiesSearched.length; i++) {
        let previousCities = document.createElement("button");
        previousCities.ClassName = "cities-searched";
        previousCities.innerText = citiesSearched[i];
        searchCityHistoryContainer.appendChild(previousCities);

        searchCityHistory.push(citiesSearched[i]);

    };

};

let namesSearched = function () {

    let namesSearched = localStorage.getItem("searchName");

    if (!namesSearched) {
        return;
    };

    namesSearched = JSON.parse(namesSearched);

    for (let i = 0; i < namesSearched.length; i++) {
        let previousNames = document.createElement("button");
        previousNames.ClassName = "names-searched";
        previousNames.innerText = namesSearched[i];
        searchNameHistoryContainer.appendChild(previousNames);

        searchNameHistory.push(namesSearched[i]);

    };

};

searchCityHistoryButton.addEventListener("click", citiesSearched);
searchNameHistoryButton.addEventListener("click", namesSearched);

let clearSearchHistory = function () {
    localStorage.clear();
    location.reload();
};

clearHistoryButton.addEventListener("click", clearSearchHistory);