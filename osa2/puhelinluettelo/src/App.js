import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Persons = ({ persons, search, setPersons, showMessage }) => {
  const notesToShow = persons.filter(person => person.name.toLowerCase().includes(search))


  

  const handleDelete = person => {
    if (window.confirm(`Do you really wanna delete ${person.name}`)){
      personService.remove(person.id).then((response) => {
        console.log("response data", response)
        setPersons(persons.filter(p => p.id !== person.id))
      }
      ).catch(error => {
        showMessage('Error in deleting number', 'error')
      })
    }
  }

  const rows = () => notesToShow.map(person =>
    <li key={person.name}>
        {person.name} - {person.number}
        <button onClick={() => handleDelete(person)}> delete </button>
    </li>
  )

  return (
    <ul>{rows()}</ul>
  )
}

const Notification = ({ message, messageType }) => {

  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

const PersonForm = ({ formHandler, newName, newNumber, handlePersonChange, handleNumberChange }) => {


  return (<form onSubmit={formHandler}>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        showMessage(`${newName} added`, 'success')
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        showMessage(error.response.data.error, 'error')
        console.log(error.response.data)
      })
  }

  const showMessage = (message, type) => {
    setMessageType(type)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const modifyPerson = () => {
    const confirm = window.confirm(`${newName} is already in phonebook. Replace number?`)
    if (confirm) {
      const person = persons.find(p => p.name === newName)
      const modifiedPerson = { ...person, number: newNumber }
      personService
        .update(person.id, modifiedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          showMessage(`${newName} edited`, 'success')
          setNewName('')
          setNewNumber('')
        })
    }
  }


  const formHandler = (event) => {
    event.preventDefault()
    if (persons.map(a => a.name).includes(newName)) {
      modifyPerson()
    } else {
      addPerson()
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} messageType={messageType} />


      <Filter handleSearch={handleSearch} search={search} />

      <h3>Add new:</h3>
      <PersonForm
        formHandler={formHandler}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}

      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} showMessage={showMessage} />
    </div>
  )

}

export default App
