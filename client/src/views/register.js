import React, {useState} from 'react';



export default function Register(){
    const [user, setUser] = useState({
        email: '',
        name: '',
        password: ''
    });


    function handleInputChange(event){
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    return (
        <div className="register">

            <div className="row">

                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <h3 className="h3 mb-3 font-weight-normal">Please Register</h3>
                <form className="form-signin">
                
                    <label>Name</label>
                    <input type="text" 
                        className="form-control" name="name" 
                        placeholder="Name" 
                        onChange={handleInputChange} 
                        value={user.name}
                        required/>
                    <label>Email</label>
                    <input type="text" className="form-control" 
                        name="email" placeholder="Email" 
                        onChange={handleInputChange} 
                        value={user.email}
                        required/>
                    <label>Password</label>
                    <input type="password" className="form-control" 
                        name="password" placeholder="Password" 
                        onChange={handleInputChange} 
                        value={user.password}
                        required/>

                    <br/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                    <p className="mt-5 mb-3 text-muted">© 2020</p>
                    <p className="">
                        <a href="/login">Sign in instead</a></p>
                </form>

                </div>
            </div>
        </div>
    );
}