import React from 'react';
import './App.css';
import Nav from './components/Nav';

import Register from './views/register';
import Login from './views/login';


function App() {
  return (
    <div className="">
      <Nav />

      {/* <Register /> */}
      <Login />
    </div>
  );
}

export default App;
