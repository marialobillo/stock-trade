import React from 'react';


export default function Nav({ logout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav mr-auto">
                <li>
                    <a href="/" className="nav-link">
                        Fantasy Stock Trade
                    </a>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li>
                    <span onClick={logout}>Logout</span>
                </li>
            </ul>
        </nav>
    )
}