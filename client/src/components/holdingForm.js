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
                <form className="form-inline" onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <select name="symbol" className="form-control" onChange={this.props.handleChange}>
                            <option>Please Select a Company Symbol</option>
                            {this.state.allSymbols.map(item => (
                                <option 
                                    key={item.id} 
                                    value={item.name}>
                                        {item.name} -------------> ${item.price}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Shares...."
                            name="shares"
                            onChange={this.props.handleChange}
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