import { isEmpty } from 'lodash';
import { setAuthToken } from 'shared/utils';
import {
    SIGN_UP_SUCCESS,
    SIGN_IN_SUCCESS,
    RESET_AUTH,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
} from 'redux/actionTypes';

const initialState = {
    token: '',
    isAuthenticated: false,
    isLoading: true,
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
                isLoading: false,
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            setAuthToken(payload);
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
            };
        case RESET_AUTH:
            setAuthToken('');
            return {
                ...initialState,
            };
        case AUTH_ERROR:
            setAuthToken('');
            return {
                ...state,
                error: payload,
                token: initialState.token,
                isAuthenticated: initialState.isAuthenticated,
                isLoading: false,
                user: initialState.user,
            };
        default:
            return state;
    }
};
