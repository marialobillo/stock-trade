import LoginRoutes from "./LoginRoutes";

type NavBarProps = {
    user: { username: string };
    logout: () => void;
};

const NavBar = ({ user, logout }: NavBarProps) => {
    return (
        <nav className="navbar navbar-dark">
            <a className="navbar-brand" href="#">
                Stock-Trade App
            </a>
            <span className="navbar-text">
                {user && <LoginRoutes user={user} logout={logout} />}
            </span>
        </nav>
    );
};

export default NavBar;
