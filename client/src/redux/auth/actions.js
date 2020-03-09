import { api } from 'utils';
import { setAlert } from 'redux/alerts/actions';
import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_PROFILE,
    LOGOUT,
} from '../actionTypes';

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
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// TODO: Implement more elegant error alerts
export const registerUser = ({ name, email, password, password2 }) => async dispatch => {
    dispatch({
        type: USER_LOADING,
    });

    const body = JSON.stringify({ name, email, password, password2 });
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await api.post('auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = Object.values(err.response.data);
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: REGISTER_FAILURE,
        });
    }
};

export const loginUser = ({ email, password }) => async dispatch => {
    dispatch({
        type: USER_LOADING,
    });

    const body = JSON.stringify({ email, password });
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await api.post('/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = Object.values(err.response.data);
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')));
        }

        dispatch({
            type: LOGIN_FAILURE,
        });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
