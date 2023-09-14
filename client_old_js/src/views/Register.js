import React, { useState } from 'react'
import Main from './../components/Main'
import { Link } from 'react-router-dom'

const Register = ({ register, showError }) => {

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        // confirm: ''
    })


    const onChange = event => {
        setUser({
            ...user, 
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await register(user)
        } catch (error) {
            showError(error.response.data)
            console.log(error)
        }
    }

    return (
        <Main center={true}>
            <div className="container text-center panel panel-default">

                <div className="form-panel panel-body">
                    <h2>Register</h2>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                min="3"
                                max="100"
                                required
                                placeholder="Your Username..."
                                className="form-control"
                                onChange={onChange}
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
                                required
                                placeholder="Your Email..."
                                className="form-control"
                                onChange={onChange}
                                value={user.email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="Your Password..."
                                className="form-control"
                                onChange={onChange}
                                value={user.password}
                            />
                        </div>

                        <div className="from-group">
                            <input
                                type="submit"
                                className="btn btn-block btn-warning"
                                value="Register"
                            />
                        </div>
                    </form>

                    <div>
                        <br/>
                        Already has an account? 
                    <Link to="/login" className="text-warning">
                        Login
                    </Link>

                    </div>

                </div>
            </div>
        </Main>
    )
}

export default Register