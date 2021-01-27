import React from 'react'

const Navbar = () => {
    
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <span className="navbar-brand" href="#">Stock Trade App </span>
                <div className="collapse navbar-collapse" id="navbarColor01">
                </div>
                <div className="">
                    <span>Maria</span>
                    --
                    <span><a className="">Logout</a></span>
                </div>

            </nav>

        </header>
    )
}

export default Navbar