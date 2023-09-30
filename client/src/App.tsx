import { useState } from 'react'
import Nav from './components/Nav'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
import { User } from './types/User'


function App() {
  
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    password: "",
  });

  const logout = () => {
    setUser({
      id: 0,
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Nav user={user} logout={logout} />
      <Register user={user} />
    </>
  )
}

export default App
