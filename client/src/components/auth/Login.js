import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const { username, password } = user

    const onChange = event => {
        setUser({
            ...user, 
            [event.target.name]: event.target.value
        })
    }

    // on submit
    const onSubmit = event => {
        event.preventDefault()

        // Validate
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <span className="navbar-brand" href="#">Stock Trade App </span>
                <div className="collapse navbar-collapse" id="navbarColor01">
                </div>
            </nav>
            <div className="container text-center">
                <div className="login-panel">
                    <h3>Welcome</h3>
                    <br/>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username..."
                                className="form-control"
                                value={username}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password..."
                                className="form-control"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className="from-group">
                            <input
                                type="submit"
                                className="btn btn-block btn-primary"
                                value="Login"
                            />
                        </div>
                    </form>

                    <br/>
                    <Link to={'/register'} className="">
                        Get a New Account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login