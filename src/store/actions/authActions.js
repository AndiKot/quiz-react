import axios from 'axios';
import {
    AUTH_SUCCESS,
} from './actionTypes';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: isLogin,
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0PjCIZH9M6gs7LDsSWvBpsyYPO7KcPAQ';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0PjCIZH9M6gs7LDsSWvBpsyYPO7KcPAQ';
        }

        const response = await axios.post(url, authData);
        const data = response.data;
        // console.log(response.data);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', new Date(new Date().getTime() + data.expiresIn * 1000));

        dispatch(authSuccess(data.idToken));
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
