import React from 'react';
import Persons from './components/Persons';
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  updatePerson = (event) => {
    let id;
    this.state.persons.forEach(person => {
      if (person.name == this.state.newName) 
    });

    personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: ''
          })
        })
  }

  addPerson = (event) => {
    event.preventDefault();
    if (this.personsContainsName(this.state.newName)) {
      if (window.confirm("Nimi on jo listassa, korvataanko puhelinnumero")) {
        this.updatePerson();
      }
    } else {
      const personObject = {
        id: this.state.persons.length + 1,
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: ''
          })
        })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value });
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value });
  }

  handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase();
    this.setState({ filter: filter });
  }

  personsContainsName = (name) => {
    let contains = false;
    const persons = this.state.persons;
    persons.forEach(person => {
      if (person.name === name) {
        contains = true;
      }
    });
    return contains;
  }

  render() {
    const personsToShow = this.state.persons.filter(person => {
      const personName = person.name.toLowerCase();
      if (personName.includes(this.state.filter)) {
        return true;
      } else {
        return false;
      }
    });

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName}
              onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber}
              onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          Rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <Persons persons={personsToShow} />
      </div>
    )
  }
}

export default App
