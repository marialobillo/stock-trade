
import { User } from './../types/User'

type NavbarProps = {
    user: User;
    logout: () => void;
}

const Navbar = ({ user, logout }: NavbarProps) => {
    return (
        <nav className="navbar navbar-dark">
            <a className="navbar-brand" href="#">Stock-Trade App</a>
            <span className="navbar-text">
                { user && <LoginRoutes user={user} logout={logout} />}
            </span>
        </nav>
    )
}



const LoginRoutes = ({ user, logout }: NavbarProps) => {

    const handleOnClick = () => {
        logout()
    }

    return (
        <>
            <span className="hello-name">
                Hello, {user.username}
            </span>
            <span>
                <a 
                    className="text-warning"
                    onClick={handleOnClick}
                >
                        Logout
                </a>
            </span>
        </>
    )
}


export default Navbar;