import React, { Component } from 'react';
import Axios from 'axios';
import HoldingForm from './../components/holdingForm';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holdings: [],
            symbols: [],
            showPopup: false
        }
    }

    componentDidMount() {
        this.loadInfo(this.props.user);
    }

    loadInfo = async (user) => {

        const symbols_url = 'http://localhost:3300/api/symbols';
        const holdings_url = `http://localhost:3300/api/holdings/${user.id}`;
        let LoadedSymbols = [];
        let newSymbol = {};

        try {
            const { data } = await Axios.get(symbols_url);

            newSymbol['symbol'] = 'AAPL';
            newSymbol['latestPrice'] = data.AAPL.quote.latestPrice;
            newSymbol['id'] = 1;

            LoadedSymbols.push(newSymbol);

            newSymbol['symbol'] = 'FB';
            newSymbol['latestPrice'] = data.FB.quote.latestPrice;
            newSymbol['id'] = 2;

            LoadedSymbols.push(newSymbol);
            


            this.setState({
                symbols: LoadedSymbols
            })
        } catch (error) {
            console.log(error.message);
        }

        try {

            // Get Holdings
            const data_holdings = await Axios.get(holdings_url);
            const loadedHoldings = data_holdings.data.holdings;
            this.setState({
                holdings: loadedHoldings
            })

        } catch (error) {
            console.log(error.message);
        }
    }



    async updateHolding(holding) {
        // get the priceSell

        holding['priceSell'] = null;
        holding['isActive'] = false;
        holding['dateSell'] = new Date().toISOString().slice(0, 10);

        try {
            const url = `http://localhost:3300/api/holdings/${holding.id}`;
            const { data } = await Axios.put(url, holding);

        } catch (error) {
            console.log(error.message)
        }
    }

    handleUpdate = holding => {
        this.updateHolding(holding);
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    render() {
        const { user } = this.props;
        
        return (
            <div className="container">

                <div className="card jumbotron">
                    <h3>Welcome {user.name} to your DashBoard!!!</h3>
                </div>

                <div className="row">
                    <HoldingForm user={user} />
                </div>

                
                <div className="row">
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
                            {this.state.holdings.map(holding => (
                                <tr key={holding.id}>
                                    <td>{holding.symbol}</td>
                                    <td>{holding.shares}</td>
                                    <td>{holding.priceBuy}</td>
                                    <td>{holding.dateBuy}</td>
                                    <td>{holding.isActive ? 'YES' : 'SOLD'}</td>
                                    <td><span className="btn btn-info"
                                        onClick={() => this.handleUpdate(holding)}>Sell Holding</span></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default Dashboard;