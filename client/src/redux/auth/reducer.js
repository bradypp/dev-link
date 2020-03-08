import { setAuthToken } from 'utils';
import { REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOADED, AUTH_ERROR } from './actionTypes';

// TODO: Get errors from response and maptoprops on registration & login form to show correct message

// TODO: add cookies token get?
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            setAuthToken(payload.token);
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAILURE:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {},
            };
        default:
            return state;
    }
};
