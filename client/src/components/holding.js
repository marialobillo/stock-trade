import React from 'react';

const Holding = ({ holding }) => (
    <div>
        <td>{holding.company}</td>
        <td>{holding.shares}</td>
        <td>{holding.priceBuy}</td>
        <td>{holding.dateBuy}</td>
        <td>{holding.isActive ? 'YES' : 'SOLD'}</td>
    </div>
);

export default Holding;