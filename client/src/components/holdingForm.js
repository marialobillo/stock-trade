import React, { Component } from 'react';
import Axios from 'axios';

class HoldingForm extends Component {
    constructor(props) {
        super(props);

        const { user } = this.props;
        const symbols = ['AAPL', 'FB', 'NFLX', 'TSLA', 'GOOG'];

        this.state = {
            allSymbols: [],
            holding: {
                symbol: '',
                shares: '',
            }
        }
    }
    componentDidMount() {
        this.getPriceForSymbols();

    }

    getPriceForSymbols = async () => {
        try {

            const url = 'http://localhost:3300/api/prices';
            const { data } = await Axios.get(url);


            let symbols = data.data;


            const loadedSymbols = this.handleData(symbols);
            this.setState({
                allSymbols: loadedSymbols
            })
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
        this.createNewHolding(newHolding);
    }

    createNewHolding = async (holding) => {
        try {
            const url = 'http://localhost:3300/api/holdings';
            const { data } = await Axios.post(url, holding);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        return (
            <div className="col-md-8">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <select name="symbol" className="form-control" onChange={this.handleChange}>
                            <option>Please Select a Company</option>
                            {this.state.allSymbols.map(item => (
                                <option key={item.id} value={item.name}>{item.name} - ${item.price}</option>
                            ))}

                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Shares...."
                            name="shares"
                            onChange={this.handleChange}
                        />
                    </div>

                    <button className="btn btn-info" >
                        Buy New Holding
                    </button>

                </form>
            </div>
        );
    }
}

export default HoldingForm;