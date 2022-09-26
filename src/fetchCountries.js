export { fetchCountries };

function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            return response.json();
            });
}