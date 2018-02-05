import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase();
    this.setState({ filter: filter });
  }

  render() {
    const countriesToShow = this.state.countries.filter(country => {
      const countryName = country.name.toLowerCase();
      if (countryName.includes(this.state.filter.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });

    return (
      <div>
        find countries: <input value={this.state.filter} onChange={this.handleFilterChange} />
        <Countries countries={countriesToShow} />
      </div>
    )
  }
}

export default App

const Countries = ({ countries }) => {

  const itemOnClick = (event) => {
    const clickedCountry = event.target.textContent;
    return countries.forEach(country => {
      if (country.name === clickedCountry) {
        return (
          <div>
            <Country key={country} country={country} />
          </div>
        )
      }
    });
  };

  if (countries.length > 1 && countries.length < 10) {
    return (
      <div>
        <ul>
          {countries.map((country) => <li key={country.name} onClick={itemOnClick}>{country.name}</li>)}
        </ul>
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <Country key={countries[0]} country={countries[0]} />
      </div>
    )
  } else {
    return (
      <div>
        Invalid filter
      </div>
    )
  }
}

const Country = ({ country }) => {
  const flag = country.flag;

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <div>
        <img src={flag} />
      </div>
    </div>
  )
}
