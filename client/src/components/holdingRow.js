import React from 'react';

const HoldingRow = ({ holding, sellHolding, user, symbols }) => (
    <tr>
        <td>{holding.symbol}</td>
        <td>{holding.shares}</td>
        <td>{holding.priceBuy}</td>
        <td>{holding.dateBuy}</td>
        <td>{holding.isActive ? 'YES' : 'NO'}</td>
        <td>
            <button
                className="btn btn-info"
                onClick={() => sellHolding(holding, user, symbols)}
            >
                Sell Holding
            </button>
        </td>
    </tr>
);

export default HoldingRow;