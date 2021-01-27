import React, { useReducer } from 'react'
import holdingContext from './holdingContext'
import holdingReducer from './holdingReducer'

const HoldingState = props => {
    const initialState = {
        holdingForm: false
    }

    // Dispatch for execute actions
    const [state, dispatch] = useReducer(holdingReducer, initialState)

    return(
        <holdingContext.Provider
            value={{
                holdingForm: state.newHolding
            }}
        >
            {props.children}
        </holdingContext.Provider>
    )
}


export default HoldingState
