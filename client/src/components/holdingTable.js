import React from 'react';

import HoldingRow from './holdingRow';

const HoldingTable = ({ holdings }) => {

    const handleOnClick = () => {

    }

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
                        OnClick={handleOnClick}
                        user={user}
                        symbols={symbols}
                    />
                ))}
            </tbody>
        </table>
    );

}

export default HoldingTable;