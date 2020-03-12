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
// TODO: add getting token from cookies?
// TODO: Move user and user profile to its own object/reducer?
const initialState = {
    token: '',
    isAuthenticated: false,
    isLoading: false,
    user: {},
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
                isLoading: true,
                isAuthenticated: false,
                user: {},
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            setAuthToken(payload.token);
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                isAuthenticated: true,
                isLoading: false,
            };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
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
