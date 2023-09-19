let requestUrl = 'https://api.openbrewerydb.org/v1/breweries';
var searchButton = document.querySelector()
var formatInputVal = document.querySelector ("#project-type-input")

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });


    var querystring = './search-results.html?q=' + formatInputVal + '&by_name='
    location.assign(querystring)




