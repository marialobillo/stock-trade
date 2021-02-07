import React from 'react';

import Main from './../components/Main'
import Loading from './../components/Loading'

import HoldingRow from './HoldingRow';

const HoldingTable = ({ holdings, user }) => {

    const handleOnClick = () => {

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
        <table className="table table-dark">
            <thead className="thead-dark">
                <tr>
                    <th>Company Symbol</th>
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
                        user={user}
                        handleonClick={handleOnClick}
                        // symbols={symbols}
                    />
                ))}
            </tbody>
        </table>
    );

}

export default HoldingTable;