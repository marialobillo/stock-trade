import {
    HOLDING_FORM,
    GET_HOLDINGS,
    ADD_HOLDING,
    VALIDATE_FORM
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
        case VALIDATE_FORM:
            return {
                ...state,
                errorForm: true
            }

        default:
            return state;
    }
}