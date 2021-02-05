import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import Axios from 'axios'

import { deleteToken, getToken, setToken, initAxiosInterceptors } from './helpers/authHelpers'
import Navbar from './components/Nav'
import Main from './components/Main'
import Loading from './components/Loading'
import Error from './components/Error'

import Register from './views/Register'
import Login from './views/Login'

initAxiosInterceptors()

const App = () => {

  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadUser = async () => {
      if(!getToken()){
        setLoadingUser(false)
        return
      }

      try {
        const { data: user } = await Axios.get('http://localhost:3300/users/whoami')
        console.log('del useEffect -------', user)
        setUser(user)
        setLoadingUser(false)
      } catch (error) {
        console.log(error)
      }
  
    }

    loadUser()
  }, [])

  const login = async (username, password) => {
    const { data } = await Axios.post('http://localhost:3300/users/login', {
      username, password
    });
    console.log('Data...', data)
    setUser(data.user)
    setToken(data.token)
  }

  const register = async (user) => {
    const { data } = await Axios.post('http://localhost:3300/users', user);
    setUser(data.user)
    setToken(data.token)
  }

  const logout = () => {
    setUser(null)
    deleteToken()
  }

  const showError = (message) => {
    setError(message)
  }

  const hideError = () => {
    setError(null)
  }
  
  if(loadingUser){
    return (
      <Main center>
        <Loading />
      </Main>
    )
  }

  return (
    <Router>
      <Navbar />
      <Error message={error} hideError={hideError}/>
       { user ? (
        <LoginRoutes />) 
       : ( 
        <LogoutRoutes login={login} register={register} showError={showError}/>
        )}
    </Router>
  );
}

const LoginRoutes = () => {
  return (
    <Switch>
      <Route 
        path="/" 
        component={() => <Main><h1>I am the feed</h1> </Main>}
        default
      />
    </Switch>
  )
}

const LogoutRoutes = ({login, register, showError}) => {
  return (
    <Switch>
      <Route 
        path="/login" 
        render={(props) => <Login {...props} login={login} showError={showError} />} 
      />
      <Route 
        render={(props) => <Register {...props} register={register} showError={showError} />} 
        default
      />
    </Switch>
  )
}

export default App;
