//function getApi() {
let requestUrl = 'https://api.openbrewerydb.org/v1/breweries';
var searchButton = document.querySelector("button")
var formatInputVal = document.querySelector ("#project-type-input")

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var brewery = (data)

        for (var i= 0; i < data.length; i++) {
        var breweryName= brewery[i].name;
        var breweryCity= brewery[i].city;
        var breweryState= brewery[i].state;
        var breweryCountry= brewery[i].country;
        var breweryPhone= brewery[i].phone;
        }


    });


   



    // GET https://api.openbrewerydb.org/v1/breweries?by_postal=44107&per_page=3
