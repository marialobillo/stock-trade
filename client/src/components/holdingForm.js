import React, { useState } from 'react'

const holdingForm = ({ allSymbols }) => {

    const [newHolding, setNewHolding] = useState({
        symbol: '',
        shares: 0
    })

    const handleChange = (event) => {
        setNewHolding({
            ...newHolding, 
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <form className="form-inline" onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label>Company</label>
                    <select name="symbol" className="form-control" onChange={handleChange}>
                        <option
                            key={0}
                            value="nosymbol"
                            defaultValue>
                            Please Select a Company 
                                    </option>
                        {allSymbols.map(symbol => (
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

export default holdingForm