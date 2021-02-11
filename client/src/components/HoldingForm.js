import React, { useState } from 'react'

import Main from './../components/Main'
import Loading from './../components/Loading'

const HoldingForm = ({ symbolPrices, getPriceBySymbol, buyNewHolding }) => {

    // const [symbolPrices, setSymbolPrices] = useState(null)
    const [newHolding, setNewHolding] = useState({
        symbol: '',
        shares: 0
    })


    const getCompanyNameBySymbol = symbol => {
        const companies = ['Apple Inc.', 'Facebook Inc.', 'Netflix Inc.', 'Tesla Inc.', 'Alphabet Inc.']
        const reference = ['AAPL', 'FB', 'NFLX', 'TSLA', 'GOOG'];
        for(let i = 0; i < reference.length; i++){
            if(reference[i] === symbol){
                return companies[i]
            }
        }
        return "nocompany"
    }
    

    const handleChange = (event) => {
        setNewHolding({
            ...newHolding, 
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if((newHolding.symbol !== "" || newHolding.symbol !== "nosymbol") 
            && newHolding.shares > 0){
            newHolding.shares = parseInt(newHolding.shares)
            newHolding.isActive = true
            newHolding.priceBuy = getPriceBySymbol(newHolding.symbol)
            newHolding.company = getCompanyNameBySymbol(newHolding.symbol)
            buyNewHolding(newHolding)
        } else{
            console.log("Please fill up the form!")
        }
        
    }


    if(!symbolPrices){
        return (
          <Main center>
            <Loading />
          </Main>
        )
    }


    return (
        <div className="container">
            <div className="text-center">
                <h3>Buy Holding</h3>
            </div>
            <form className="form-inline form-holding" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Company</label>
                    <select name="symbol" className="form-control" onChange={handleChange}>
                        <option
                            key={0}
                            value="nosymbol"
                            defaultValue>
                            Please Select a Company 
                        </option>
                        {symbolPrices.map(symbol => (
                            <option
                                key={symbol.id}
                                value={symbol.name}>
                                {symbol.name} / ${symbol.price}
                            </option>
                        ))}

                    </select>
                </div>
                <div className="form-group">
                    <label>Shares</label>
                    <input
                        className="form-control"
                        placeholder="Shares...."
                        name="shares"
                        onChange={handleChange}
                        value={newHolding.shares}
                    />
                </div>

                <div className="form-group">
                    <div className="new-holding">
                        <button className="btn btn-warning" >New Holding
                        </button>
                    </div>
                </div>

            </form>
            <hr/>
        </div>
    )

}

export default HoldingForm