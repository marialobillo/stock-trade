import React, { Component } from 'react';
import Axios from 'axios';

class HoldingForm extends Component {
    constructor(props) {
        super(props);

        const { user } = this.props;
        const symbols = ['AAPL', 'FB', 'NFLX', 'TSLA', 'GOOG'];
        const {loadedSymbols} = this.props;


        this.state = {
            allSymbols: [],
            holding: {
                symbol: '',
                shares: '',
            }
        }
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

        if(this.props.loadedSymbols.length === 0){
            return null;
        }
        console.log('ahi vamos!!--->', this.props.loadedSymbols);
        return (
            <div className="col-md-8">
                <form className="form-inline" onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <select name="symbol" className="form-control" onChange={this.props.handleChange}>
                            <option>Please Select a Company Symbol</option>
                            {this.props.loadedSymbols.map(item => (
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