import React, { Component } from 'react';
import Axios from 'axios';
import HoldingForm from './../components/holdingForm';
import Balance from './../components/balance';
import HoldingTable from './../components/holdingTable';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holdings: [],
            symbols: [],
            allSymbols: [],
            showPopup: false,
            user: this.props.user
        }

        const symbolNames = ['AAPL', 'FB', 'NFLX', 'TSLA', 'GOOG'];


    }

    componentDidMount() {
        this.loadInfo(this.state.user);
        this.getPriceForSymbols();

        console.log('los symbols en el dashboard ---> ', this.state.allSymbols);
    }

    loadInfo = async (user) => {
        try {
            const holdings_url = `http://localhost:3300/api/holdings/${user.id}`;
            const data_holdings = await Axios.get(holdings_url);
            const loadedHoldings = data_holdings.data.holdings;
            this.setState({
                holdings: loadedHoldings
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    getPriceForSymbols = async () => {
        try {
            const url = 'http://localhost:3300/api/prices';
            Axios.get(url)
                .then(response => {
                    const symbols = response.data.data;
                    const loadedSymbols = this.handleData(symbols);
                    this.setState({
                        allSymbols: loadedSymbols
                    })
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    handleData = (symbols) => {

        let result = [];
        const reference = ['AAPL', 'FB', 'NFLX', 'TSLA', 'GOOG'];
        for (let i = 0; i < 5; i++) {
            let symbol = {};
            symbol['id'] = i + 1;
            symbol['name'] = reference[i];
            symbol['price'] = symbols[reference[i]].quote.latestPrice;
            result.push(symbol);
        }
        return result;
    }

    
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    // For Table Holdings
    async sellHolding(holding, user, symbols) {
        // get the priceSell

        try {

            holding['sellPrice'] = 0;
            holding['isActive'] = false;
            holding['dateSell'] = new Date().toISOString().slice(0, 10);

            const url = `http://localhost:3300/api/holdings/${holding.id}`;
            const { data } = await Axios.put(url, holding);

        } catch (error) {
            console.log(error.message)
        }

        console.log(user);
        try {
            this.loadInfo(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    handleChange = event => {
        this.setState({
            holding: {
                ...this.state.holding,
                [event.target.name]: event.target.value
            }
        });

    }

    handleSubmit = event => {
        event.preventDefault();

        const { symbol, shares } = this.state.holding;
        const { user } = this.props;

        if (symbol === '' || shares === '') {
            return;
        }

        const newHolding = { ...this.state.holding };
        newHolding.userId = user.id;
        newHolding.dateBuy = Date.now();
        newHolding.isActive = true;

        
        const allSymbols = this.state.allSymbols;

        for (let i = 0; i < 5; i++) {
            if(allSymbols[i].name === newHolding.symbol){
                newHolding.priceBuy = allSymbols[i].price;
                console.log('LO QUE TENEMOS DEL NEW HOLDING --->',newHolding.priceBuy);
            }
        }
        console.log('new Holding ---> ',newHolding);
        this.createNewHolding(newHolding);
    }



    render() {
        const { user } = this.state;
        return (
            <div className="container">

                <div className="card jumbotron">
                    <h3>Welcome {user.name} to your DashBoard!!!</h3>
                    <Balance user={user} />
                </div>

                <div className="row">
                    <HoldingForm 
                        user={user}
                        loadedSymbols={this.state.allSymbols} 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />
                </div>


                <div className="row">
                    <HoldingTable
                        holdings={this.state.holdings}
                        sellHolding={this.sellHolding}
                        user={user}
                        symbols={this.state.symbols} />
                </div>
            </div>
        );
    }
}


export default Dashboard;