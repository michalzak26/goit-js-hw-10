// fetchCountries.js

const fetchCountries = async name => {
  const fields = 'name,flags,capital,population,languages';
  const url = `https://restcountries.com/v2/name/${name}?fields=${fields}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const countries = await response.json();
    return countries;
  } catch (error) {
    throw error;
  }
};

export default fetchCountries;
