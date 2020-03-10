import { setAuthToken } from 'utils';
import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_USER,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    ACCOUNT_DELETED,
} from 'redux/actionTypes';

// TODO: Get errors from response and maptoprops on registration & login form to show correct message

// TODO: add cookies token get?
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload,
            };
        case USER_LOADING:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true,
                user: null,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            setAuthToken(payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case AUTH_ERROR:
        case LOGOUT_USER:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            };
        default:
            return state;
    }
};
