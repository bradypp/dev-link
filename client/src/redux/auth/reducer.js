import { setAuthToken } from 'shared/utils';
import {
    SIGN_UP_SUCCESS,
    SIGN_IN_SUCCESS,
    SIGN_OUT_USER,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
} from 'redux/actionTypes';

const initialState = {
    token: '',
    isAuthenticated: false,
    isUserLoading: false,
    user: {},
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isUserLoading: true,
                isAuthenticated: false,
                user: {},
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isUserLoading: false,
                user: payload,
                error: {},
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            setAuthToken(payload);
            return {
                ...state,
                isAuthenticated: true,
                token: payload,
                error: {},
            };
        case SIGN_OUT_USER:
            setAuthToken('');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isUserLoading: false,
                user: {},
                error: {},
            };
        case AUTH_ERROR:
            setAuthToken('');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isUserLoading: false,
                user: {},
                error: payload,
            };
        default:
            return state;
    }
};
