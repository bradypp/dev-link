import { setAuthToken } from 'utils';
import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    ACCOUNT_DELETED,
} from 'redux/actionTypes';

// TODO: Get errors from response and maptoprops on registration & login form to show correct message
// TODO: Add getting token from cookies?
const initialState = {
    token: '',
    isAuthenticated: false,
    isLoading: false,
    user: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADED: {
            const { user } = payload.data;
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user,
            };
        }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                user: {},
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: {
            const { token } = payload.data;
            setAuthToken(token);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token,
            };
        }
        case AUTH_ERROR:
        case LOGOUT_USER:
        case ACCOUNT_DELETED:
            setAuthToken('');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: {},
            };
        default:
            return state;
    }
};
