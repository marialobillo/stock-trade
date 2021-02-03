import React, { useReducer } from 'react'

import AuthContext from './authContext'
import AuthReducer from './authReducer'

import axiosClient from './../../config/axios'
import authToken from './../../config/authToken'

import { 
    SUCCESS_REGISTER,
    ERROR_REGISTER,
    GET_AUTH_USER,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOGOUT
 } from './../../types'


 const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null, 
        user: null,
        message: null
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)

    const registrationUser = async data => {
        try {
            const response = await axiosClient.post('/users', data)

            dispatch({
                type: SUCCESS_REGISTER,
                payload: response.data
            })
            userAuthenticated()
        } catch (error) {
            const alert = {
                message: error.response.data.message,
                category: 'alert-error'
            }
            
            dispatch({
                type: ERROR_REGISTER,
                payload: alert
            })
        }
    } 

    // Return user authenticated
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token')
        if(token){
            // TODO: Function for send token by headers
            authToken(token)
        }

        try {
            const response = await axiosClient.get('/users/auth')
            console.log(response)
        } catch (error) {
            console.log(error)
            dispatch({
                type: ERROR_LOGIN
            })
        }
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token, 
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registrationUser   
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
 }

 export default AuthState