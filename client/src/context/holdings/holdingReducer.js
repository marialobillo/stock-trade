import { HOLDING_FORM } from '../../types'


export default (state, action) => {
    switch(action.type){
        case HOLDING_FORM:
            return {
                ...state,
                holdingForm: true 
            }
        default:
            return state;
    }
}