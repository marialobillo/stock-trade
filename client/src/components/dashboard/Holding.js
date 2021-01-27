import React from 'react'

const Holding = ({holding}) => {
    
    return(
        <li>
            <span>{holding.company}</span>---
            <span>{holding.shares}</span>---
            <span>${holding.priceBuy}</span>---
            <span>{holding.isActive}</span>

            <button className="btn btn-warning">Sell</button>
        </li>
    )
}


export default Holding