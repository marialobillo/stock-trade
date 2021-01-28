import {
    HOLDING_FORM,
    GET_HOLDINGS,
    ADD_HOLDING
} from '../../types'


export default (state, action) => {
    switch (action.type) {
        case HOLDING_FORM:
            return {
                ...state,
                holdingForm: true
            }
        case GET_HOLDINGS:
            return {
                ...state,
                holdings: action.payload
            }
        case ADD_HOLDING:
            return {
                ...state,
                holdings: [...state.holdings, action.payload],
                holdingForm: false
            }

        default:
            return state;
    }
}