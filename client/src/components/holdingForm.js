import React, { Component } from 'react';

class HoldingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSymbols: [],
            holding: {
                symbol: '',
                shares: '',
            }
        }
    }

    render() {

        if(this.props.loadedSymbols.length === 0){
            return null;
        }
        return (
            <div className="col-md-8">
                <form className="form-inline" onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <select name="symbol" className="form-control" onChange={this.props.handleChange}>
                            <option 
                                key={0} 
                                value="nosymbol"
                                selected>
                                Please Select a Company Symbol
                            </option>
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
                            value={this.state.shares}
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