import React from 'react'
import Sidebar from '../layout/Sidebar'
import HoldingList from './HoldingList'
import Navbar from './../layout/Navbar'

const Dashboard = () => {
    return (
        <div className="">

            <Navbar />



            <div className="container text-center panel panel-default">


                <div className="form-holding">
                    <Sidebar />
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