import { setAuthToken } from 'utils';
import {
    SIGNUP_SUCCESS,
    SIGNIN_SUCCESS,
    SIGNOUT_SUCCESS,
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
        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS: {
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
        case SIGNOUT_SUCCESS:
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
