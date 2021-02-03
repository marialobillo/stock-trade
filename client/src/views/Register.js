import React, { useState } from 'react'
import Main from './../components/Main'
// import { Link } from 'react-router-dom'

const Register = () => {

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        confirm: ''
    })


    const onChange = event => {
        setUser({
            ...user, 
            [event.target.name]: event.target.value
        })
    }

    return (
        <Main center={true}>
            <div className="container text-center panel panel-default">

                <div className="form-panel panel-body">
                    <h2>Register</h2>

                    <form
                        // onSubmit={onSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                min="3"
                                max="100"
                                placeholder="Your Username..."
                                onChange={onChange}
                                className="form-control"
                                value={user.username}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                maxLength="150"
                                placeholder="Your Email..."
                                onChange={onChange}
                                className="form-control"
                                value={user.email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Your Password..."
                                onChange={onChange}
                                className="form-control"
                                value={user.password}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm"
                                name="confirm"
                                placeholder="Please, repeat your Password..."
                                onChange={onChange}
                                className="form-control"
                                value={user.confirm}
                            />
                        </div>

                        <div className="from-group">
                            <input
                                type="submit"
                                className="btn btn-block btn-success"
                                value="Register"
                            />
                        </div>
                    </form>

                    <div>
                        Already has an account? 
                    <a href="/login" className="">
                        Login
                    </a>

                    </div>

                </div>
            </div>
        </Main>
    )
}

export default Register