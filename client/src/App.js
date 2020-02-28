import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Axios from 'axios';

import { setToken, deleteToken, getToken, initAxiosInterceptors } from './helpers/auth-helpers';
import Register from './views/register';
import Login from './views/login';
import Dashboard from './views/dashboard';
import Loading from './components/loading';
import Error from './components/error';


initAxiosInterceptors();

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      if (!getToken !== null) {
        setLoadingUser(false);
        return;
      }
      console.log(getToken())
      try {
        let token = getToken();

        let datos = {
          token: token
        }
        const { data: user } = await Axios.post('http://localhost:3300/api/whoami', datos);
        setUser(user);
        setLoadingUser(false);
        getSymbols();
      } catch (error) {
        console.log(error);
      }
    }

    loadUser();
  }, []);

  async function login(email, password) {
    const url = 'http://localhost:3300/api/users/login';
    const { data } = await Axios.post(url, { email, password });
    setUser(data.user[0]);
    setToken(data.token);
  }

  async function register(user) {
    const url = 'http://localhost:3300/api/users/register';
    const { data } = await Axios.post(url, user);
    setUser(data.user);
    setToken(data.token);
  }

  function logout() {
    setUser(null);
    deleteToken();
  }

  function showError(message){
    setError(message);
  }

  function hideError(){
    setError(null);
  }

  if (loadingUser) {
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  }

  async function getSymbols(){
    if(true){
      const url = 'http://localhost:3300/api/symbols';
      try {
        const data = await Axios.get(url);
        console.log('Lo que llega de symbols', data);
        //setSymbols(symbols);
      } catch (error) {
        console.log(error.message);
      }        
    }

  }

  return (
    <Router>
      <Nav logout={logout} />
      <Error message={error} hideError={hideError}/>
      {user ? <LoginRoutes user={user}/> : <LogoutRoutes login={login} register={register} showError={showError} />}
    </Router>
  );
}

function LoginRoutes({user}) {
  return (
    <Switch>
      <Route
        render={(props) => <Dashboard {...props} user={user} />} 
        default
      />
      
    </Switch>
  );
}

function LogoutRoutes({ login, register, showError }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={(props) => <Login {...props} login={login} showError={showError} />}
      />
      <Route
        default
        render={(props) => <Register {...props} register={register} showError={showError}/>}
      />
    </Switch>
  );
}

