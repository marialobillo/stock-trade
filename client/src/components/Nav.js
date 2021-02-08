import React from 'react'

const Navbar = ({ user, logout }) => {
    return (
        <nav className="navbar navbar-dark bg-primary">
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
            <span>
                Hello, {user.username}
            </span>
            <span>
                <button 
                    className="btn btn-secondary"
                    onClick={handleOnClick}
                >
                        Logout
                </button>
            </span>
        </>
    )
}


export default Navbar;