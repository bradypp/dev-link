import { REGISTER_SUCCESS, REGISTER_FAILURE } from './actionTypes';

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
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAILURE:
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
