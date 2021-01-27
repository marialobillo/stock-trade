import React, { useReducer } from 'react'
import holdingContext from './holdingContext'
import holdingReducer from './holdingReducer'
import { HOLDING_FORM } from '../../types'

const HoldingState = props => {
    const initialState = {
        holdingForm: false
    }

    // Dispatch for execute actions
    const [state, dispatch] = useReducer(holdingReducer, initialState)

    // functions for the holding CRUD
    const showHoldingForm = () => {
        dispatch({
            type: HOLDING_FORM
        })
    }

    return(
        <holdingContext.Provider
            value={{
                holdingForm: state.holdingForm,
                showHoldingForm
            }}
        >
            {props.children}
        </holdingContext.Provider>
    )
}


export default HoldingState
