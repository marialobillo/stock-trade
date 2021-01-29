import React from 'react'

const Holding = ({holding, sellHolding}) => {

    const currentHolding = holding => {
        sellHolding(holding)
    }
    
    return(
        <li>
            <span>{holding.company}</span>---
            <span>{holding.shares}</span>---
            <span>${holding.priceBuy}</span>---
            <span>{holding.isActive}</span>

            <button 
                className="btn btn-warning"
                onClick={() => currentHolding(holding)}    
            >Sell</button>
        </li>
    )
}


export default Holding