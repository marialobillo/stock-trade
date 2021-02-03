import axiosClient from './axios'

const authToken = token => {
    if(token){
        axiosClient.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axiosClient.defaults.headers.common['x-auth-token']
    }
}

export default authToken