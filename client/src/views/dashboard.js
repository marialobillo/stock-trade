import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Error from './../components/error';

export default function Dashboard({ user }) {
    const [holdings, setHoldings] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function loadInfo() {

            const url_holdings = `http://localhost:3300/api/holdings/${user.id}`;
            try {
                const data_holdings = await Axios.get(url_holdings);
                const loadedHoldings = data_holdings.data.holdings;
                setHoldings(loadedHoldings);

            } catch (error) {
                console.log(error.message);
            }
        }

        loadInfo();
    }, []);

    function showError(message) {
        setError(message);
    }

    function hideError() {
        setError(null);
    }

    async function handleUpdate(holding) {

        holding['priceSell'] = 340.55;
        holding['isActive'] = false;
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
            <div className="card">
                <span>Welcome {user.name} to your DashBoard!!!</span>
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