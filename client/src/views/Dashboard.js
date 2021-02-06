import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Main from './../components/Main'
import Navbar from './../components/Nav'
import HoldingForm from '../components/HoldingForm'



const Dashboard = ({user, showError}) => {

    const [symbolPrices, setSymbolPrices] = useState(null)


    useEffect(() => {
        const getSymbolPrices = async () => {
            if(true){
              const url = 'http://localhost:3300/symbols';
              try {
                const { data }  = await Axios.get(url);
                const symbolPrices = handleDataFromSymbols(data)
                setSymbolPrices(symbolPrices)
              } catch (error) {
                console.log(error.message);
              }        
            }
        
        }
    
        getSymbolPrices()
    }, [])

    const handleDataFromSymbols = (symbols) => {

        let result = [];
        const reference = ['AAPL', 'FB', 'NFLX', 'TSLA', 'GOOG'];
        for (let i = 0; i < 5; i++) {
            let symbol = {};
            symbol['id'] = i + 1;
            symbol['name'] = reference[i];
            symbol['price'] = symbols[reference[i]].quote.latestPrice;
            result.push(symbol);
        }
        return result;
    }


    return(
        <Main center>
            

            <HoldingForm symbolPrices={symbolPrices}/>


            <h2>Hello From Dashboard {user.username}</h2>

           
        </Main>
    )
}

export default Dashboard