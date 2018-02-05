import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

const promise = axios.get('http://localhost:3001/persons')

promise.then(response => {
  const persons = response.data;
})