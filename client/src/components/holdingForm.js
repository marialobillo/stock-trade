import React, {Component} from 'react';
import Axios from 'axios';

class HoldingForm extends Component{
    constructor(props){
        super(props);

        const { user } = this.props;
        this.state = {
            holding: {
                symbol: '',
                shares: '',
            }
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
        
        const {symbol, shares } = this.state.holding;
        const {user} = this.props;

        if(symbol === '' || shares === ''){
            return;
        }

        const newHolding = {...this.state.holding};
        newHolding.userId = user.id;
        newHolding.dateBuy = Date.now();

        console.log('-----  HANDLE SUBMIT: ', newHolding);
        this.createNewHolding(newHolding);
    }

    createNewHolding = async (holding) => {
        try {
            const url = 'http://localhost:3300/api/holdings';
            const { data } = await Axios.post(url, holding);
        } catch (error) {
            console.log(error.message);
        }
    }

    render(){
        return(
            <div className="col-md-8">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input 
                        className="form-control" 
                        placeholder="Company Symbol...." 
                        name="symbol"
                        onChange={this.handleChange}
                        />
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