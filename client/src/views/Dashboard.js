import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Main from './../components/Main'
import HoldingForm from './../components/HoldingForm'
import HoldingTable from './../components/holdingTable'



const Dashboard = ({user, showError}) => {

    const [symbolPrices, setSymbolPrices] = useState(null)
    const [holdings, setHoldings] = useState(null)
    const [currentHolding, setCurrentHolding] = useState(null)


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
        const getHoldings = async () => {
            const url = 'http://localhost:3300/holdings'
            try {
                const { data } = await Axios.get(url)
                setHoldings(data)
            } catch (error) {
                showError(error.response.data)
                console.log(error)
            }
        }
    
        getHoldings()
        getSymbolPrices()
    }, [currentHolding])

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

    const buyNewHolding = async holding => {
        const url = "http://localhost:3300/holdings"
        try {
            const { data } = await Axios.post(url, holding)
            setCurrentHolding(data)
        } catch (error) {
            showError(error.response.data)
            console.log(error)
        }
    }

    const sellHolding = async holding => {
        const url = "http://localhost:3300/holdings"
        try {
            const { data } = await Axios.put(url, holding)
        } catch (error) {
            showError(error.response.data)
            console.log(error)
        }
    }


    return(
        <Main center>
            

            <HoldingForm 
                symbolPrices={symbolPrices} 
                buyNewHolding={buyNewHolding} 
                user={user}    
            />


            <h2>Hello From Dashboard {user.username}</h2>
            <HoldingTable holdings={holdings} user={user} sellHolding={sellHolding}/>

           
        </Main>
    )
}

export default Dashboard