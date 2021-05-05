import React, { useState, useEffect } from 'react'

import Person from './Components/Person.js'
import Filter from './Components/Filter.js'
import Form from './Components/Form.js'
import Notification from './Components/Notification.js'

import personService from './Services/persons.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notifMsg, setNotifMsg ] = useState(null)
  const [ errMsg, setErrMsg ] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    for (let i = 0; i < persons.length; i++){
      if (persons[i].name === newName){
        const person = persons[i]
        const changedPerson = {...person, number:newNum}

        if (!window.confirm(
          `${newName} is already in the phonebook - replace the old number with a new one?`
        )) return
        
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNum('')
            
            setNotifMsg(`Modified ${changedPerson.name}'s number to ${changedPerson.number}`)
            setTimeout(() => setNotifMsg(null), 5000)
          })
        return
      }
    }

    const personObj = {name: newName, number: newNum}

    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
        
        setNotifMsg(`Added ${personObj.name}`)
        setTimeout(() => setNotifMsg(null), 5000)
      })
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return
    
    personService
      .remove(id)
      .catch(error => {
        setErrMsg(`${name} is not in the phonebook`)
        setTimeout(() => setErrMsg(null), 5000)
      })
    
    setPersons(persons.filter(person => person.id !== id))
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMsg} isError={false} />
      <Notification message={errMsg} isError={true} />
      <Filter value={filter} handleChange={handleFilterChange} />

      <h2>Add a New Number</h2>
      <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} />

      <h2>Numbers</h2>
      {personsToShow.map((person) => 
        <Person key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id, person.name)} />
      )}
    </div>
  )
}

export default App
