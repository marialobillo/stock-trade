import React, { useState } from 'react'
import Main from './../components/Main'
import { Link } from 'react-router-dom'

const Login = ({ login, showError }) => {

    const [user, setUser] = useState({
        username: '',
        password: '',
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
            await login(user.username, user.password)
        } catch (error) {
            showError(error.response.data)
            console.log(error)
        }
    }

    return (
        <Main center={true}>
            <div className="container text-center panel panel-default">

                <div className="form-panel panel-body">
                    <h2>Login</h2>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Your Username..."
                                required
                                className="form-control"
                                onChange={onChange}
                                value={user.username}
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
                                value="Login"
                            />
                        </div>
                    </form>

                    <div>
                        <br/>
                        Create a new account...
                    <Link to="/register" className="text-warning">
                        Register
                    </Link>

                    </div>

                </div>
            </div>
        </Main>
    )
}

export default Login