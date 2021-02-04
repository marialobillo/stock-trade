import React, { useState } from 'react'
import Main from './../components/Main'
// import { Link } from 'react-router-dom'

const Login = ({ login }) => {

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
            login(user.username, user.password)
        } catch (error) {
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
                                min="3"
                                max="100"
                                placeholder="Your Username..."
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
                                placeholder="Your Password..."
                                className="form-control"
                                onChange={onChange}
                                value={user.password}
                            />
                        </div>

                       

                        <div className="from-group">
                            <input
                                type="submit"
                                className="btn btn-block btn-success"
                                value="Login"
                            />
                        </div>
                    </form>

                    <div>
                        Create a new account...
                    <a href="/register" className="">
                        Register
                    </a>

                    </div>

                </div>
            </div>
        </Main>
    )
}

export default Login