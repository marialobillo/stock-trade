import React, { useReducer } from 'react'

import alertReducer from './alertReducer'
import alertContext from './alertContext'

import { SHOW_ALERT, HIDE_ALERT } from '../../types'

const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [ state, dispatch ] = useReducer(alertReducer, initialState)

    // Functions 
    const showAlert = (message, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                message, 
                category
            }
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }

    return (
        <alertContext.Provider
            value={{
                alert: state.alert, 
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
            )


}

export default AlertState