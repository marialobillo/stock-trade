import React from 'react';

const HoldingRow = ({ holding, handleOnClick }) => {

    return (
        <tr>
            <td>{holding.symbol} </td> 
            <td>{holding.company}</td>
            <td>{holding.shares}</td>
            <td>$ {holding.priceBuy}</td>
            <td>{holding.dateBuy.split('T')[0]}</td>
            <td>{holding.isActive ? 'YES' : 'NO'}</td>
            <td>
                <button
                    className="btn btn-warning"
                    onClick={() => handleOnClick(holding)}
                >
                    Sell
                </button>
            </td>
        </tr>
    ) 
}

export default HoldingRow;