import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Axios from 'axios';

import { setToken, deleteToken, getToken, initAxiosInterceptors } from './helpers/auth-helpers';
import Register from './views/register';
import Login from './views/login';
import Loading from './components/loading';

initAxiosInterceptors();

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

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

  if (loadingUser) {
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  }

  return (
    <Router>
      <Nav />
      {user ? <LoginRoutes /> : <LogoutRoutes login={login} register={register} />}
    </Router>
  );
}

function LoginRoutes() {
  return (
    <Switch>
      <Route
        path="/"
        component={() => <div><h1>I am the holding</h1></div>} 
        default
      />
    </Switch>
  );
}

function LogoutRoutes({ login, register }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={(props) => <Login {...props} login={login} />}
      />
      <Route
        default
        render={(props) => <Register {...props} register={register} />}
      />
    </Switch>
  );
}

