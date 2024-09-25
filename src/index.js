// // index.js

import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryInfo = document.getElementById('country-info');

const displayCountries = countries => {
  countryInfo.innerHTML = '';

  if (countries.length === 1) {
    // Wyświetl szczegóły jednego kraju
    const country = countries[0];
    const languages = country.languages.map(lang => lang.name).join(', ');

    countryInfo.innerHTML = `
            <div class="country-detail">
                <img src="${country.flags.svg}" alt="Flag of ${country.name}" />
                <h2>${country.name}</h2>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Population:</strong> ${country.population}</p>
                <p><strong>Languages:</strong> ${languages}</p>
            </div>
        `;
  } else if (countries.length > 1 && countries.length <= 10) {
    // Wyświetl listę krajów
    const listItems = countries
      .map(
        country => `
            <li class="country-card">
                <img src="${country.flags.svg}" alt="Flag of ${country.name}" /> 
                <span>${country.name}</span>
            </li>
        `
      )
      .join('');

    countryInfo.innerHTML = `<ul>${listItems}</ul>`;
  } else if (countries.length > 10) {
    // Zbyt wiele wyników
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
};

const searchCountries = async event => {
  const searchTerm = event.target.value.trim();

  if (searchTerm === '') {
    countryInfo.innerHTML = '';
    return;
  }

  try {
    const countries = await fetchCountries(searchTerm);
    displayCountries(countries);
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name.');
  }
};

searchBox.addEventListener('input', debounce(searchCountries, 300));
