import React from 'react'
import Header from '../layout/Header'
import HoldingList from './HoldingList'

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

                <hr/>

                <div className="list-holdings">
                    <h3>Your Holdings</h3>

                    <HoldingList/>
                </div>

            </div>

        </div>
    )
}

export default Dashboard