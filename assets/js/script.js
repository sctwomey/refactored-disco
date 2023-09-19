let requestUrl = 'https://api.openbrewerydb.org/v1/breweries';
var searchButton = document.querySelector()
fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });



