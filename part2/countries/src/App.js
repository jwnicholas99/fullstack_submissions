import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Country from './Components/Country.js'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    if (search === ''){
      setCountries([])
      return
    }

    axios
    .get(`https://restcountries.eu/rest/v2/name/${search}`)
    .then((response) => {
      setCountries(response.data)
    })
  }, [search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  
  return (
    <div>
      Search countries: <input onChange={handleSearchChange} value={search} />
      {countries.length > 10
        ? <p>Too many matches, specify another filter!</p>  
        : countries.map(country =>
            <Country key={country.name} country={country} /> 
          )
      }
    </div>
  );
};

export default App;
