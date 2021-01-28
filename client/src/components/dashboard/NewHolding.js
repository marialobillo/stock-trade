import React, { Fragment, useState, useContext } from 'react'
import holdingContext from '../../context/holdings/holdingContext'


const NewHolding = () => {

    // Get form state 
    const holdingsContext = useContext(holdingContext)
    const { holdingForm, errorForm, 
        showHoldingForm, addHolding, showError } = holdingsContext

    const [holding, setHolding] = useState({
        company: '',
        shares: 0
    })

    const { company, shares} = holding

    const onChangeHolding = event => {
        setHolding({
            ...holding, 
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHolding = event => {
        event.preventDefault()

        // Validate holding
        if(company === 'nocompany' || shares == 0){
            showError()
            return
        } 
        // Add to the state
        addHolding(holding)

        // Clean the form
        setHolding({
            company: 'nocompany',
            shares: 0
        })
    }

    const onClickShowForm = () => {
        showHoldingForm()
    }

    return (

        <Fragment>
        <div className="col-md-8">

            <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={ onClickShowForm }
            >
                New Holding
            </button>

            { holdingForm ?
                 (
                    <form className="form" onSubmit={onSubmitHolding} >

                    <label>Company</label>
                    <select name="company" className="form-control" onChange={onChangeHolding} >
                        <option
                            key={0}
                            value="nocompany"
                            defaultValue>
                            Please Select a Company
                        </option>
                        <option key={1}
                                value="APPL">
                                    Apple ---- $300/Share</option>
                        <option key={2} value="GOOG">Google ---- $120</option>
                        <option key={3} value="FCBK">Facebook ---- $140</option>
                        <option key={4} value="EBAY">Ebay ---- $260 </option>
                    </select>

                    <label>Shares</label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Shares..."
                        name="shares"
                        value={shares}
                        onChange={onChangeHolding}
                    />

                    <input
                        type="submit"
                        className="btn btn-info btn-block"
                        value="Buy Holding"
                    />
                </form>
                ) : null }

                { errorForm ? <p>Please, Select a company and shares.</p>: null }
        </div>

        </Fragment>
    )
}


export default NewHolding