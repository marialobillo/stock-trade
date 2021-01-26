import React, { Fragment, useState} from 'react'


const NewHolding = () => {

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

    const onSubmitHoldng = event => {
        event.preventDefault()

        // Validate holding 

        // Add to the state

        // Clean the form
    }

    return (

        <Fragment>
        <div className="col-md-8">

            <button
                type="button"
                className="btn btn-primary btn-block"
            >
                New Holding
            </button>

            <form className="form" onSubmit={onSubmitHoldng} >

                <label>Company</label>
            <select name="company" className="form-control" >
                <option
                    key={0}
                    value="nocompany"
                    defaultValue>
                    Please Select a Company
                </option>
                <option>Apple ---- $300/Share</option>
                <option>Google ---- $120</option>
                <option>Facebook ---- $140</option>
                <option>Ebay ---- $260 </option>
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
        </div>

        </Fragment>
    )
}


export default NewHolding