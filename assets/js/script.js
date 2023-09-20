
async function getBreweries() {
    try {
        const response = await fetch(
            'https://api.openbrewerydb.org/v1/breweries',
            {
                method: 'GET',
            },
        );

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        };

        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error);
    };
};

getBreweries().then(data => {
    console.log(data);

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
    container.appendChild(ol);

});