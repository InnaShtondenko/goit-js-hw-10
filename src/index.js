import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import debounce from "lodash.debounce";


const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();

    const countryName = refs.input.value.trim();
    if (!countryName) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(countryName)
        .then(renderCountries)
        .catch(onError)
}

function renderCountries(countries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
    }

    if (countries.length > 2 && countries.length < 10) {
        const list = countries.map(({ flags, name }) => {
            return `<li class="county-list__item">
            <img class="image" src="${flags.svg}" alt="" width="40" height="40"
            <h2 class="country-list__title">${name.official}</h2>
            </li>`
        }).join('');
        refs.countryList.innerHTML = list;
    }

    if (countries.length === 1) {
        const markup = countries.map(({ flags, name, capital, population, languages }) => {
            return `<img src="${flags.svg}" alt="${name.official}" width="50" height="40"
            <h2 class="official">${name.official}</h2>
            <div class="discription">
            <p><span>Capital:</span>${capital}</p>
            <p><span>Population:</span>${population}</p>
            <p><span>Languages:</span>${Object.values(languages)}</Object></p>
            </div>`
        }).join('');
        refs.countryInfo.innerHTML = markup;
    }
}

function onError() {
    Notify.failure("Oops, there is no country with that name");
}