import React from 'react'
import Main from './../components/Main'
import Navbar from './../components/Nav'

const Dashboard = ({user, showError, symbolPrices}) => {

    console.log('symbol prices', symbolPrices)
    return(
        <Main center>
            <Navbar user={user}/>

            <h2>Hello From Dashboard {user.username}</h2>

           
        </Main>
    )
}

export default Dashboard