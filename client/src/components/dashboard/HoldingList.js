import React, { useContext } from 'react'
import Holding from './Holding'
import holdingContext from '../../context/holdings/holdingContext'


const HoldingList = () => {

    const holdingsContext = useContext(holdingContext)
    const { holdings } = holdingsContext

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