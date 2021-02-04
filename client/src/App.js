import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { deleteToken, getToken, setToken, initAxiosInterceptors } from './helpers/authHelpers'
import Navbar from './components/Nav'
import Main from './components/Main'
import Loading from './components/Loading'

import Register from './views/Register'
import Login from './views/Login'

initAxiosInterceptors()

const App = () => {

  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

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
    console.log('De Login --> ', data.user)
    setUser(data.user)
    setToken(data.token)
  }

  const register = async (user) => {
    const { data } = await Axios.post('http://localhost:3300/users', user);
    setUser(data.user)
    setToken(data.token)
  }

  const logout = () => {
    setUser(null);
    deleteToken();
  }
  
  if(loadingUser){
    return (
      <Main center>
        <Loading />
      </Main>
    )
  }

  return (
    <div className="container">
      <Navbar />

      {/* <Register register={register} /> */}
      <Login login={login}/>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}

export default App;
