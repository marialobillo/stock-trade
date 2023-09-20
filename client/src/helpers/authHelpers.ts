import Axios from 'axios';

const TOKEN_KEY = process.env.TOKEN_KEY || 'token';

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const initAxiosInterceptors = () => {
    Axios.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    Axios.interceptors.response.use(
        (response) => response, 
        (error) => {
            if (error.response.status === 401) {
                deleteToken();
                window.location.replace('/login');
            } else {
                return Promise.reject(error);
            }      
    })
}