import React, { PureComponent } from 'react';
import Axios from 'axios';
//import Error from './../components/error';

require('dotenv').config();


class Dashboard extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            holdings: []
        }
    }

    componentDidMount(){
        this.loadInfo(this.props.user);
    }

    loadInfo = async (user) => {

        const url_holdings = `http://localhost:3300/api/holdings/${user.id}`;
        try {
            
            // Get Holdings
            const data_holdings = await Axios.get(url_holdings);
            const loadedHoldings = data_holdings.data.holdings;
            this.setState({
                holdings: loadedHoldings
            })

        } catch (error) {
            console.log(error.message);
        }
    }


    handleUpdate = async (holding) => {

        holding['priceSell'] = null;
        holding['isActive'] = true;
        holding['dateSell'] = new Date().toISOString().slice(0, 10);

        try {
            const url = `http://localhost:3300/api/holdings/${holding.id}`;
            const { data } = await Axios.put(url, holding);
        } catch (error) {
            console.log(error.message)
        }

    }


    render(){
        const {user} = this.props;
        return (
            <div className="container">
            
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
                        {this.state.holdings.map(holding => (
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
}


export default Dashboard;