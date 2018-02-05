import React from 'react'
import personService from './../services/persons'

const Person = ({ person }) => {

    const deletePerson = () => {
        if (window.confirm("Do you really want remove " + person.name + "?")) {
            console.log('Delete ' + person.name);
            personService
                .remove(person.id)
                .then(response => {
                    window.location.reload();
                });
        }
    }

    return (
        <div>
            <p>{person.name} {person.number} <button onClick={deletePerson}>Delete</button> </p>
        </div>
    )
}

export default Person