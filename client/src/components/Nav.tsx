import { Navbar, Container } from "react-bootstrap";
import { User } from "./../types/User";

type NavbarProps = {
    user: User;
    logout: () => void;
};

const Nav = ({ user, logout }: NavbarProps) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand href="/">Stock-Trade App</Navbar.Brand>

                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>
                        {user && <LoginRoutes user={user} logout={logout} />}
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const LoginRoutes = ({ user, logout }: NavbarProps) => {
    const handleOnClick = () => {
        logout();
    };

    return (
        <>
            <span className="hello-name">Hello, {user.username}</span>
            <span>
                <a className="text-warning" onClick={handleOnClick}>
                    Logout
                </a>
            </span>
        </>
    );
};

export default Nav;
