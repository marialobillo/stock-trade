import React from 'react'

const Navbar = ({ user, logout }) => {
    return (
        <nav className="navbar navbar-dark">
            <a className="navbar-brand" href="#">Stock-Trade App</a>
            <span className="navbar-text">
                { user && <LoginRoutes user={user} logout={logout} />}
            </span>
        </nav>
    )
}



const LoginRoutes = ({user, logout}) => {

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