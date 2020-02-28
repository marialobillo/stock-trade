import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Dashboard({ user }) {
    const [symbols, setSymbols] = useState([]);
    const [holdings, setHoldings] = useState([]);

    useEffect(() => {
        async function loadInfo() {

                const url_symbols = 'http://localhost:3300/api/symbols';
                const url_holdings = `http://localhost:3300/api/holdings/active/${user.id}`;

                try {
                    const data = await Axios.get(url_symbols);
                    const loadedSymbols = data.data.symbols;
                    setSymbols(loadedSymbols);

                    const data_holdings = await Axios.get(url_holdings);
                    const loadedHoldings = data_holdings.data.holdings;
                    setHoldings(loadedHoldings);

                } catch (error) {
                    console.log(error.message);
                }

                
        }

        loadInfo();
    }, []);


    return (
        <div className="container">
            <div className="card">
                <span>Welcome {user.name}to your DashBoard!!!</span>
                <span>{symbols.map(symbol => (<p key={symbol.id}>{symbol.symbol}</p>))}</span>

                <span className="row">
    {holdings.map(holding => (<p key={holding.id}>{holding.symbolId}</p>))}
                </span>
            </div>

            <div className="table">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Holding</th>
                            <th>Date</th>
                            <th>Shares</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    );
}