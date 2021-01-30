import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'

import HoldingState from './context/holdings/holdingState'
import AlertState from './context/alerts/alertState'
import AuthState from './context/authentication/authState'

function App() {
  return (
    <div>
      <HoldingState>
        <AlertState>
            <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
              </Router>
          </AuthState>
        </AlertState>
      </HoldingState>
    </div>
  );
}

export default App;
