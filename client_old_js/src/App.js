import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";

import {
    deleteToken,
    getToken,
    setToken,
    initAxiosInterceptors,
} from "./helpers/authHelpers";
import Navbar from "./components/Nav";
import Main from "./components/Main";
import Loading from "./components/Loading";
import Error from "./components/Error";

import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

initAxiosInterceptors();

const App = () => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUser() {
            if (!getToken()) {
                setLoadingUser(false);
                return;
            }
            try {
                const { data: user } = await Axios.get(
                    "http://localhost:3300/users/whoami"
                );
                setUser(user);
                setLoadingUser(false);
            } catch (error) {
                console.log(error);
            }
        }

        loadUser();
    }, []);

    const login = async (username, password) => {
        const { data } = await Axios.post("http://localhost:3300/users/login", {
            username,
            password,
        });
        setUser(data.user);
        setToken(data.token);
    };

    const register = async (user) => {
        const { data } = await Axios.post("http://localhost:3300/users", user);
        setUser(data.user);
        setToken(data.token);
    };

    const logout = () => {
        setUser(null);
        deleteToken();
    };

    const showError = (message) => {
        setError(message);
    };

    const hideError = () => {
        setError(null);
    };

    if (loadingUser) {
        return (
            <Main center>
                <Loading />
            </Main>
        );
    }

    return (
        <Router>
            <Navbar user={user} logout={logout} />
            <Error message={error} hideError={hideError} />
            {user ? (
                <LoginRoutes showError={showError} user={user} />
            ) : (
                <LogoutRoutes
                    login={login}
                    register={register}
                    showError={showError}
                />
            )}
        </Router>
    );
};

const LoginRoutes = ({ user, showError }) => {
    return (
        <Switch>
            <Route
                render={(props) => (
                    <Dashboard {...props} user={user} showError={showError} />
                )}
                default
            />
        </Switch>
    );
};

const LogoutRoutes = ({ login, register, showError }) => {
    return (
        <Switch>
            <Route
                path="/login"
                render={(props) => (
                    <Login {...props} login={login} showError={showError} />
                )}
            />
            <Route
                render={(props) => (
                    <Register
                        {...props}
                        register={register}
                        showError={showError}
                    />
                )}
                default
            />
        </Switch>
    );
};

export default App;
