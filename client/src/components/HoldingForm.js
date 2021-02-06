import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Main from './../components/Main'
import Loading from './../components/Loading'

const HoldingForm = ({ symbolPrices }) => {

    // const [symbolPrices, setSymbolPrices] = useState(null)
    const [newHolding, setNewHolding] = useState({
        symbol: '',
        shares: 0
    })

    // useEffect(() => {
    //     const getSymbolPrices = async () => {
    //         if(true){
    //           const url = 'http://localhost:3300/symbols';
    //           try {
    //             const { data }  = await Axios.get(url);
    //             const symbolPrices = handleDataFromSymbols(data)
    //             setSymbolPrices(symbolPrices)
    //           } catch (error) {
    //             console.log(error.message);
    //           }        
    //         }
        
    //     }
    
    //     getSymbolPrices()
    // }, [])

    

    const handleChange = (event) => {
        setNewHolding({
            ...newHolding, 
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if((newHolding.symbol !== "" || newHolding.symbo !== "nosymbol") 
            && newHolding.shares > 0){
            console.log("here we go!!", newHolding)
        } else{
            console.log("Please fill up the form!!")
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