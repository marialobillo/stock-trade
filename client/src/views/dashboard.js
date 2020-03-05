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
            showPopup: false,
            user: this.props.user
        }
        
        
    }

   

    componentDidMount() {
        this.loadInfo(this.state.user);
        console.log(this.state.user);
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

    updateUserBalance = async (user, holding) => {

        try {

        } catch (error) {

        }
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
                    <HoldingForm user={user} />
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