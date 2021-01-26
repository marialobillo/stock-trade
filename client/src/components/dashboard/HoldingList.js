import React from 'react'
import Holding from './Holding'


const HoldingList = () => {

    const holdings = [
        {company: 'Google Inc.', shares: 120, priceBuy: 123.40, isActive: true},
        {company: 'Facebook Inc.', shares: 50, priceBuy: 205.40, isActive: true},
        {company: 'Ebay.', shares: 80, priceBuy: 89.40, isActive: true},
        {company: 'Apple', shares: 200, priceBuy: 30.40, isActive: true}
    ]


    return (

        <ul className="holding-list">
            {holdings.map(holding => (
                <Holding
                    holding={holding}
                />
            ))}
        </ul>
    )
}

export default HoldingList