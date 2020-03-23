import { setAuthToken } from 'shared/utils';
import {
    SIGN_UP_SUCCESS,
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    ACCOUNT_DELETED,
} from 'redux/actionTypes';

const initialState = {
    token: '',
    isAuthenticated: false,
    isLoading: false,
    user: {},
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload,
                error: {},
            };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                user: {},
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            setAuthToken(payload);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: payload,
                error: {},
            };
        case SIGN_OUT_SUCCESS:
        case ACCOUNT_DELETED:
            setAuthToken('');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: {},
                error: {},
            };
        case AUTH_ERROR:
            setAuthToken('');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: {},
                error: payload,
            };
        default:
            return state;
    }
};
