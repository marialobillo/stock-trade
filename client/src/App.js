import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Axios from 'axios';

import {setToken, deleteToken, getToken, initAxiosInterceptors} from './helpers/auth-helpers';
import Register from './views/register';
import Login from './views/login';

initAxiosInterceptors();

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser(){
      if(!getToken){
        setLoadingUser(false);
        return;
      }
  
      try {
        let token = getToken();
        
        let datos = {
          token: token
        }
        const {data: user} = await Axios.post('http://localhost:3300/api/whoami', datos);
        setUser(user);
        console.log('Hello');
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadUser();
  }, []);

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

