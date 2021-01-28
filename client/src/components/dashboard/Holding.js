import React from 'react'

const Holding = ({holding, sellHolding}) => {
    
    return(
        <li>
            <span>{holding.company}</span>---
            <span>{holding.shares}</span>---
            <span>${holding.priceBuy}</span>---
            <span>{holding.isActive}</span>

            <button 
                className="btn btn-warning"
                onClick={sellHolding}    
            >Sell</button>
        </li>
    )
}


export default Holding