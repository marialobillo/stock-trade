import React from 'react'
import Header from '../layout/Header'

const Dashboard = () => {
    return (
        <div className="">

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <span className="navbar-brand" href="#">Stock Trade App </span>
            <div className="collapse navbar-collapse" id="navbarColor01">
            </div>
            </nav>

            <div className="container text-center panel panel-default">


                <div className="form-holding">
                    <Header />
                </div>

                <div className="list-holdings">

                </div>

            </div>

        </div>
    )
}

export default Dashboard