import React from 'react';

const Balance = ({ user }) => (
    <div>
        <div>
            <h3>Your balance is <span className="balance">${user.balance}</span></h3>
        </div>
    </div>
);

export default Balance;