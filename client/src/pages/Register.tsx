import Main from "../components/Main";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent } from "react";


type RegisterProps = {
    user: {
        username: string;
        email: string;
        password: string;
    };
};

const Register = ({ user }: RegisterProps ) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
  return (
    <Main center={true}>
        <Container>
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
        </Container>
    </Main>
  )
}

export default Register