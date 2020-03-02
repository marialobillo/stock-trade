import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function Login({ login, showError , getSymbols}) {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    function handleInputChange(event){
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event){
        event.preventDefault();

        try {
            await login(user.email, user.password)            
        } catch (error) {
            //showError(error.response.data);
            console.log(error);
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <h3 className="h3 mb-3 font-weight-normal card-title">Please Login</h3>
                    <form className="form-signin" onSubmit={handleSubmit}>

                        <label>Email</label>
                        <input type="text" className="form-control"
                            name="email" placeholder="Email"
                            onChange={handleInputChange}
                            value={user.email}
                            required />
                        <label>Password</label>
                        <input type="password" className="form-control"
                            name="password" placeholder="Password"
                            onChange={handleInputChange}
                            value={user.password}
                            required />

                        <br />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                            Login</button>
                        <p className="mt-5 mb-3 text-muted">© 2020</p>
                        <p className="">
                            <Link to="/register">Create an account</Link></p>
                    </form>

                </div>
            </div>
        </div>
    );
}