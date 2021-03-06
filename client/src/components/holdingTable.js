import React from 'react';

import Main from './../components/Main'
import Loading from './../components/Loading'

import HoldingRow from './HoldingRow';

const HoldingTable = ({ holdings,  getPriceBySymbol, sellHolding }) => {

    const handleOnClick = holding => {
        holding.isActive = false 
        holding.priceSell = getPriceBySymbol(holding.symbol)
        
        holding.dateSell = getCurrentDate('-')
        console.log('The before holding', holding.dateSell)
        sellHolding(holding)
    }

    const getCurrentDate = (separator='') => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    


    if(!holdings){
        return (
          <Main center>
            <Loading />
          </Main>
        )
    }

    console.log("Holdings", holdings)
    return (
        <div className="container">
            <div className="text-center">
                <h3>Your Holdings</h3>
            </div>
            <table className="table table-light">
                <thead className="table-dark">
                    <tr>
                        <th>Symbol</th>
                        <th>Company</th>
                        <th>Shares</th>
                        <th>Price Buy</th>
                        <th>Date Buy</th>
                        <th>Is Active</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.map(holding => (
                        <HoldingRow
                            key={holding.id}
                            holding={holding}
                            handleOnClick={handleOnClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default HoldingTable;