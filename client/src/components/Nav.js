import React from 'react'

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Stock-Trade App</a>
            <span className="navbar-text">
                { user && <LoginRoutes user={user} />}
            </span>
        </nav>
    )
}

const LoginRoutes = ({user}) => {
    return (
        <>
            <span>
                Hello, {user.username}
            </span>
        </>
    )
}


export default Navbar;