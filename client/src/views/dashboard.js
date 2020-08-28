import React, { Component } from 'react';
import Axios from 'axios';
import HoldingForm from './../components/holdingForm';
import Balance from './../components/balance';
import HoldingTable from './../components/holdingTable';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holding: {
                symbol: '',
                shares: '',
            },
            holdings: [],
            symbols: [],
            allSymbols: [],
            showPopup: false,
            user: this.props.user
        }

    }

    componentDidMount() {
        this.loadInfo(this.state.user);
        this.getPriceForSymbols();
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
            // Axios.get(url)
            //     .then(response => {
            //         const symbols = response.data.data;
            //         console.log('SYMBOLS', symbols);
            //         const loadedSymbols = this.handleData(symbols);
            //         this.setState({
            //             allSymbols: loadedSymbols
            //         })
            //     });
            const response = await Axios.get(url);
            const symbols = response.data;
            const loadedSymbols = this.handleData(symbols);
            console.log('LOS LOADEDSYMBOLS', loadedSymbols);
            this.setState({
                allSymbols: loadedSymbols
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


    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    // For Table Holdings
    handleOnClick = (holding, user, symbols) => {
        this.sellHolding(holding, user, symbols);
    }
    async sellHolding(holding, user, symbols) {
        // get the priceSell
        let sellPrice = 0;
        symbols.map((symbol) => {
            if (symbol.name === holding['symbol']) {
                sellPrice = symbol.price;
            }
        })

        try {
            // Selling Holding
            holding['sellPrice'] = sellPrice;
            holding['isActive'] = false;
            holding['dateSell'] = new Date().toISOString().slice(0, 10);
            const url = `http://localhost:3300/api/holdings/${holding.id}`;
            const { data } = await Axios.put(url, holding);

            // updata the user balance
            const url_for_user = `http://localhost:3300/api/users/${user.id}`;
            let money_from_selling = Number(holding.shares) * Number(holding.priceBuy);
            user.balance = (Number(user.balance) + Number(money_from_selling)).toFixed(2)
            const userData = await Axios.put(url_for_user, user);
            this.setState({
                user: userData.data.user
            })

            // ask for holdings
            this.loadInfo(user);
        } catch (error) {
            console.log(error.message)
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

        if (symbol === "nosymbol" || shares === '') {
            return;
        }

        const newHolding = { ...this.state.holding };
        newHolding.userId = user.id;
        newHolding.dateBuy = new Date().toISOString().slice(0, 10);
        newHolding.isActive = true;


        const allSymbols = this.state.allSymbols;

        for (let i = 0; i < 5; i++) {
            if (allSymbols[i].name === newHolding.symbol) {
                newHolding.priceBuy = allSymbols[i].price;
            }
        }
        this.createNewHolding(newHolding);

        this.setState({
            showPopup: false
        })
    }

    createNewHolding = async (holding) => {
        const currentUser = this.state.user;
        try {
            // create/buy a holding
            const url = 'http://localhost:3300/api/holdings';
            const { data } = await Axios.post(url, holding);

            // update user balance
            const url_for_user = `http://localhost:3300/api/users/${currentUser.id}`;
            const { user } = this.props;
            user.balance -= holding.shares * holding.priceBuy;
            user.balance = (user.balance).toFixed(2);
            const userData = await Axios.put(url_for_user, user);
            this.setState({
                user: userData.data.user
            })

            // ask for holdings
            this.loadInfo(this.state.user);
        } catch (error) {
            console.log(error.message);
        }
    }



    render() {
        const { user } = this.state;
        return (
            <div className="">

                <div className="card jumbotron">
                    <h3>Welcome {user.name} to your DashBoard!!!</h3>
                    <Balance user={user} />
                </div>

                <div className="container">

                    <div className="row">
                        <button 
                            onClick={this.togglePopup}
                            className="btn btn-info"
                        >Buy A New Holding</button>
                        {/* <HoldingForm
                            user={user}
                            loadedSymbols={this.state.allSymbols}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        /> */}
                    </div>

                    <div className="row">
                        {this.state.showPopup ?
                            <HoldingForm
                                user={user}
                                loadedSymbols={this.state.allSymbols}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                closePopup={this.togglePopup}
                            /> 
                            : null   
                    }
                    </div>


                    <div className="row">
                        <HoldingTable
                            holdings={this.state.holdings}
                            handleOnClick={this.handleOnClick}
                            symbols={this.state.allSymbols}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Dashboard;