let requestUrl = 'https://api.openbrewerydb.org/v1/breweries';

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });


    // GET https://api.openbrewerydb.org/v1/breweries?by_postal=44107&per_page=3