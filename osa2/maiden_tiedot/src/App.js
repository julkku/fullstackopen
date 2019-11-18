import React, { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';


const CountryList = ({ countries, search, setSearch }) => {
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  const FormatCountry = (country) => {
    return (
      <div>
        <h1>{country.name}</h1>
        capital: {country.capital} <br />
        population: {country.population}
        <h2>Languages</h2>
        <ul>{country.languages.map(language => <li key={language.name}> {language.name}</li>)}</ul>

        <img src={country.flag} width="200px"></img>

      </ div>
    )

  }

  const countryList = () => {
    if (countriesToShow.length > 10) {
      return ("Too many matches, specify another filter")
    }

    if (countriesToShow.length === 0) return "No matches"

    if (countriesToShow.length === 1) {
      return FormatCountry(countriesToShow[0])
    }

    return countriesToShow.map(
      country =>
        <span key={country.name}>
          {country.name}
          <button onClick={() => setSearch(country.name)}>show
            </button> <br />
        </span>)

  }


  return (
    <>
      {countryList()}
    </>)
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }



  return (
    <div>
      Find countries: <input value={search} onChange={handleSearch} />
      <br />
      <CountryList countries={countries} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App;
