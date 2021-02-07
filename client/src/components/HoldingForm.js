import React, { useState } from 'react'

import Main from './../components/Main'
import Loading from './../components/Loading'

const HoldingForm = ({ symbolPrices, buyNewHolding }) => {

    // const [symbolPrices, setSymbolPrices] = useState(null)
    const [newHolding, setNewHolding] = useState({
        symbol: '',
        shares: 0
    })

    const getPriceBySymbol = symbol => {
        let price
        symbolPrices.map(item => {
            if(item.name === symbol){
                price = item.price
            }
        })
        return price
    }

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
        <div>
            <form className="form-inline" onSubmit={handleSubmit}>
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
                    <div className="footer">
                        <button className="btn btn-info" >New Holding
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )

}

export default HoldingForm