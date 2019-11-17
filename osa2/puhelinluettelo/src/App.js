import React, { useState } from 'react'
import { notStrictEqual } from 'assert'

const Persons = ({ persons, search }) => {
  const notesToShow = persons.filter(person => person.name.toLowerCase().includes(search))

  const rows = () => notesToShow.map(person =>
    <li key={person.name}>
      {person.name} - {person.number}
    </li>)

  return (
    <ul>{rows()}</ul>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, handlePersonChange, handleNumberChange }) => {


  return (<form onSubmit={addPerson}>
    <div>
      name:
      <input
        value={newName}
        onChange={handlePersonChange} />
    </div>
    <div>number:
      <input
        value={newNumber}
        onChange={handleNumberChange} />

    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Filter = ({ handleSearch, search }) => {
  return (
    <p>
      Filter shown with:
    <input onChange={handleSearch} value={search} />
    </p>)
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(a => a.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} search={search} />
      
      <h3>Add new:</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}

      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )

}

export default App
