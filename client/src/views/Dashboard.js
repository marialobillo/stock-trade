import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Main from './../components/Main'
import Navbar from './../components/Nav'
import HoldingForm from '../components/HoldingForm'



const Dashboard = ({user, showError}) => {

    

    // useEffect(() => {
    //     const getSymbolPrices = async () => {
    //         if(true){
    //           const url = 'http://localhost:3300/symbols';
    //           try {
    //             const { data }  = await Axios.get(url);
    //             setSymbolPrices(data)
    //           } catch (error) {
    //             console.log(error.message);
    //           }        
    //         }
        
    //     }
    
    //     getSymbolPrices()
    // }, [])

    return(
        <Main center>
            <Navbar />

            <HoldingForm />


            <h2>Hello From Dashboard {user.username}</h2>

           
        </Main>
    )
}

export default Dashboard