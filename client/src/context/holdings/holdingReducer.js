import {
    HOLDING_FORM,
    GET_HOLDINGS
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
        default:
            return state;
    }
}