// import Axios from 'axios';

const TOKEN_KEY = 'FST_TOKEN';

export function setToken(token){
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(){
    // verify token - TODO
    return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken(){
    localStorage.removeItem(TOKEN_KEY);
}

