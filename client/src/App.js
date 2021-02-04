import React, { useState } from 'react'
import Axios from 'axios'

import { setToken } from './helpers/authHelpers'
import Navbar from './components/Nav'

import Register from './views/Register'
import Login from './views/Login'

const App = () => {

  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    const { data } = await Axios.post('http://localhost:3300/users/login', {
      username, password
    });
    console.log(data)
    setUser(data.user);
    setToken(data.token);
  }

  return (
    <div className="container">
      <Navbar />

      {/* <Register /> */}
      <Login login={login}/>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}

export default App;
