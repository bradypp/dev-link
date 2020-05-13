import { isEmpty } from 'lodash';
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
    isLoading: false,
    user: {},
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: initialState.isAuthenticated,
                user: initialState.user,
            };
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: !isEmpty(payload),
                isLoading: initialState.isLoading,
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            setAuthToken(payload);
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
            };
        case SIGN_OUT_USER:
            setAuthToken('');
            return {
                ...state,
                token: '',
                isAuthenticated: initialState.isAuthenticated,
                isLoading: initialState.isLoading,
                user: initialState.user,
            };
        case AUTH_ERROR:
            setAuthToken('');
            return {
                ...state,
                error: payload,
                token: initialState.token,
                isAuthenticated: initialState.isAuthenticated,
                isLoading: initialState.isLoading,
                user: initialState.user,
            };
        default:
            return state;
    }
};
