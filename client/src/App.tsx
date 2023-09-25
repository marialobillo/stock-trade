import React, { useState, useEffect } from 'react'
import './App.css'
import { isSetup } from './helpers/authHelpers'


import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {

  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [error, setError] = useState(null)


  const handleClick = () => {
    isSetup();
    console.log('click me now!!');
  }
  return (
    <>
      <h2>Hello Stock trade app</h2>
      <button onClick={handleClick}>click me!</button>
    </>
  )
}

export default App
