import * as AT from './authTypes';
import {loggedInUserCred} from './auth.config.js';

export const authenticateUser = (email, password) => {
    const credentials = {
        email: email,
        password: password
    };
    return dispatch => {
        dispatch({
            type: AT.LOGIN_REQUEST
        });
        
        if(credentials.email === loggedInUserCred["username"] && credentials.password === loggedInUserCred["password"]){
            localStorage.setItem('jwtToken', "valid_user");
            dispatch(success(true));
        }
        else {
            dispatch(failure());
        }
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch({
            type: AT.LOGOUT_REQUEST
        });
        localStorage.removeItem('jwtToken');
        dispatch(success(false));
    };
};

const success = isLoggedIn => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false
    };
};