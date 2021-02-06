import React from 'react'
import Main from './../components/Main'

const Dashboard = ({user, showError}) => {

    return(
        <Main center>

            <h2>Hello From Dashboard {user.username}</h2>
        </Main>
    )
}

export default Dashboard