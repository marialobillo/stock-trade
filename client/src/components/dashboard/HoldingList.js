import React, { useContext, useEffect } from 'react'
import Holding from './Holding'
import holdingContext from '../../context/holdings/holdingContext'


const HoldingList = () => {

    // Extracting holdings
    const holdingsContext = useContext(holdingContext)
    const { holdings, getHoldings, sellHolding } = holdingsContext

    useEffect(() => {
        getHoldings()
    }, [])


    if(holdings.length === 0) return null


    return (

        <ul className="holding-list">
            {holdings.map(holding => (
                <Holding key={holding.id}
                    holding={holding}
                    sellHolding={sellHolding}
                />
            ))}
        </ul>
    )
}

export default HoldingList