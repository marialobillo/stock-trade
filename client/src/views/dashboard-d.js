import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Error from './../components/error';
require('dotenv').config();

export default function Dashboard({ user }) {
    const [holdings, setHoldings] = useState([]);
    const [error, setError] = useState(null);
    const [symbols, setSymbols] = useState([]);

   
    useEffect(() => {

        // const sym = 'TSLA';
        // const token = 'Tpk_0220e2de4b494482a13bb0309fe7449e';
       // console.log(process.env.TOKEN_IEX);
        // let url = `https://sandbox.iexapis.com/stable/stock/${sym}/intraday-prices?token=${token}&chartLast=10`;
        // let url = `https://sandbox.iexapis.com/stable/stock/intraday-prices?token=Tpk_0220e2de4b494482a13bb0309fe7449e&symbols=fb,aapl&chartLast=5`;
        //https://sandbox.iexapis.com/v1/stock/market/batch?types=chart,splits,news&symbols=aapl,goog,fb&range=5y%20&token=Tpk_0220e2de4b494482a13bb0309fe7449e
        async function loadInfo() {

            const url_holdings = `http://localhost:3300/api/holdings/${user.id}`;
            try {
                
                // Get Holdings
                const data_holdings = await Axios.get(url_holdings);
                const loadedHoldings = data_holdings.data.holdings;
                setHoldings(loadedHoldings);

            } catch (error) {
                console.log(error.message);
            }
        }

        loadInfo();
    }, []);


    function hideError() {
        setError(null);
    }

    async function handleUpdate(holding) {

        holding['priceSell'] = null;
        holding['isActive'] = true;
        holding['dateSell'] = new Date().toISOString().slice(0, 10);

        try {
            const url = `http://localhost:3300/api/holdings/${holding.id}`;
            const { data } = Axios.put(url, holding);
        } catch (error) {
            console.log(error.message)
        }

    }
    return (
        <div className="container">
            <Error message={error} hideError={hideError} />
            <div className="card jumbotron">
                <h3>Welcome {user.name} to your DashBoard!!!</h3>
            </div>

            <div className="row">
                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
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
                            <tr key={holding.id}>
                                <td>{holding.company}</td>
                                <td>{holding.shares}</td>
                                <td>{holding.priceBuy}</td>
                                <td>{holding.dateBuy}</td>
                                <td>{holding.isActive ? 'YES' : 'SOLD'}</td>
                                <td><span className="btn btn-danger" onClick={() => handleUpdate(holding)}>Sell</span></td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}