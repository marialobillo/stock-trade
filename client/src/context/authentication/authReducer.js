import { 
    SUCCESS_REGISTER,
    ERROR_REGISTER,
    GET_AUTH_USER,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOGOUT
 } from './../../types'


export default (state, action) => {
    switch(action.type){
        case ERROR_LOGIN:
        case ERROR_REGISTER:
            localStorage.removeItem('token')
           return {
               ...state, 
               token: null,
               message: action.payload
           }
        case SUCCESS_REGISTER:
            localStorage.setItem('token', action.payload.token)

            return {
                ...state, 
                authenticated: true, 
                message: null
            }
        
        
        default:
            return state;
    }
} 