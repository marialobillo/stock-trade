import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Register = (props) => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirm: ''
    })
    
    const { username, email, password, confirm } = user

    const onChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();

        // Validate no empty fields 

        // password min 6 chars

        // password == confirm

        // to action

    
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <span className="navbar-brand" href="#">Stock Trade App </span>
                <div className="collapse navbar-collapse" id="navbarColor01">
                </div>
            </nav>
            <div className="container text-center panel panel-default">

                <div className="login-panel panel-body">
                    <h3>Register</h3>
                    <br/>

                    <form onSubmit={onSubmit} >
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Your Username..."
                                onChange={onChange}
                                className="form-control"
                                value={username}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Your Email..."
                                onChange={onChange}
                                className="form-control"
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Your Password..."
                                onChange={onChange}
                                className="form-control"
                                value={password}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="confirm"
                                name="confirm"
                                placeholder="Please, repeat your Password..."
                                onChange={onChange}
                                className="form-control"
                                value={confirm}
                            />
                        </div>

                        <div className="from-group">
                            <input
                                type="submit"
                                className="btn btn-block btn-primary"
                                value="Register"
                            />
                        </div>
                    </form>

                    <br/>
                    <Link to={'/'} className="">
                        Go to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;