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
        if (this.props.loadedSymbols.length === 0) {
            return null;
        }
        return (
            <div className="popup">
                <div className="popup_inner">

                    <div className="col-md-10">

                        <form className="form-inline" onSubmit={this.props.handleSubmit}>
                            
                            <div className="form-group">
                                <label>Company</label>
                                <select name="symbol" className="form-control" onChange={this.props.handleChange}>
                                    <option
                                        key={0}
                                        value="nosymbol"
                                        defaultValue>
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
                                <label>Shares</label>
                                <input
                                    className="form-control"
                                    placeholder="Shares...."
                                    name="shares"
                                    onChange={this.props.handleChange}
                                    value={this.state.shares}
                                />
                            </div>

                            <div className="footer">

                                <button className="btn btn-info" >Buy New Holding
                                </button>
                                <button
                                    onClick={this.props.closePopup}
                                    className="btn btn-warning">Cancel
                                </button>
                            </div>


                        </form>
                    </div>

                </div>
            </div>

        );
    }
}

export default HoldingForm;