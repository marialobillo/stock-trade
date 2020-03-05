import React, { Component } from 'react';

class HoldingTable extends Component {
    constructor(props) {
        super(props);

        const holdings = this.props;
    }

    handleClick = () => {

        this.props.handleSelling()
    }

    render() {
        return (
            <div>
                {this.holdings.map(holding => (
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
            </div>
        );
    }
}

export default HoldingTable;