import { api, errorHandler } from 'utils';
import {
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    CLEAR_PROFILE,
    LOGOUT_USER,
} from 'redux/actionTypes';

// Auth error
export const authError = () => async dispatch => {
    dispatch({
        type: AUTH_ERROR,
    });
};

// Load user
export const loadUser = () => async dispatch => {
    try {
        dispatch({
            type: USER_LOADING,
        });

        const res = await api.get('/user');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        errorHandler(err, dispatch, authError);
    }
};

// TODO: Implement more elegant error alerts
export const registerUser = ({ name, email, password, password2 }) => async dispatch => {
    try {
        dispatch({ type: USER_LOADING });

        const body = JSON.stringify({ name, email, password, password2 });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        errorHandler(err, dispatch, authError, true);
    }
};

export const loginUser = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: USER_LOADING });
        const body = JSON.stringify({ email, password });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        errorHandler(err, dispatch, authError, true);
    }
};

export const logoutUser = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT_USER });
};
