import React from 'react';

import Navbar from './components/Nav'
import Register from './views/Register'
import Login from './views/Login'

function App() {
  return (
    <div className="container">
      <Navbar />

      {/* <Register /> */}
      <Login />
    </div>
  );
}

export default App;
