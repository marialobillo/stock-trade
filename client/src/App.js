import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Axios from 'axios';

import {setToken, deleteToken} from './helpers/auth-helpers';
import Register from './views/register';
import Login from './views/login';


export default function App() {
  const [user, setUser] = useState(null);

  async function login(email, password){
    const url = 'http://localhost:3300/api/users/login';
    const { data } = await Axios.post(url, {email, password});
    setUser(data.user[0]);
    setToken(data.token);
  }

  async function register(user){
    const url = 'http://localhost:3300/api/users/register';
    const { data } = await Axios.post(url, user);
    setUser(data.user);
    setToken(data.token);
  }

  function logout(){
    setUser(null);
    deleteToken();
  }

  return (
    <div className="">
      <Nav />

      {/* <Register register={register} /> */}
      <Login login={login} />
  <div>{JSON.stringify(user)}</div>
    </div>
  );
}

