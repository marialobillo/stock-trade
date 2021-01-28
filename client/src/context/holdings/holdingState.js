import React, { useReducer } from 'react'
import {v4 as uuidv4 } from 'uuid'

import holdingContext from './holdingContext'
import holdingReducer from './holdingReducer'

import { 
    ADD_HOLDING,
    GET_HOLDINGS, 
    HOLDING_FORM, 
    VALIDATE_FORM,
    SELL_HOLDING
} from '../../types'



const HoldingState = props => {

    const holdings = [
        {id:1, company: 'Google Inc.', shares: 120, priceBuy: 123.40, isActive: true},
        {id:2, company: 'Facebook Inc.', shares: 50, priceBuy: 205.40, isActive: true},
        {id:3, company: 'Ebay.', shares: 80, priceBuy: 89.40, isActive: true}
        // {id:4, company: 'Apple', shares: 200, priceBuy: 30.40, isActive: true}
    ]


    const initialState = {
        holdings : [],
        holdingForm: false,
        errorForm: false
    }

    // Dispatch for execute actions
    const [state, dispatch] = useReducer(holdingReducer, initialState)

    // functions for the holding CRUD
    const showHoldingForm = () => {
        dispatch({
            type: HOLDING_FORM
        })
    }

    // Get the holdings
    const getHoldings = () => {
        dispatch({
            type: GET_HOLDINGS,
            payload: holdings
        })
    }

    // Buy a new holding
    const addHolding = holding => {
        holding.id = uuidv4()

        // 
        dispatch({
            type: ADD_HOLDING,
            payload: holding
        })
    }

    // Validation form
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // sell a holding
    const sellHolding = holding => {
        holding.priceSell = 100
        holding.isActive = false 
        holding.dateSell = Date.now()
        console.log('El holding vendido!!!!', holding)
        dispatch({
            type: SELL_HOLDING,
            payload: holding
        })
    }

    return(
        <holdingContext.Provider
            value={{
                holdings: state.holdings,
                holdingForm: state.holdingForm,
                errorForm: state.errorForm,
                showHoldingForm,
                getHoldings,
                addHolding,
                showError,
                sellHolding
            }}
        >
            {props.children}
        </holdingContext.Provider>
    )
}


export default HoldingState
