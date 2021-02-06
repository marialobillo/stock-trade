import React from 'react'

const Navbar = ({ user }) => {
    console.log('User on Navbar', user)
    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Stock-Trade App</a>
            <span className="navbar-text">
                Hello, {user.username} your balance is ${user.balance}
            </span>
        </nav>
    )
}


export default Navbar;