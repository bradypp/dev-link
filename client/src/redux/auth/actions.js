import { api, globalErrorHandler } from 'utils';
import { setAlert } from 'redux/alerts';
import {
    SIGNUP_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    SIGNIN_SUCCESS,
    CLEAR_PROFILE,
    SIGNOUT_SUCCESS,
    ACCOUNT_DELETED,
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
        globalErrorHandler(err, dispatch, authError);
    }
};

// TODO: Implement more elegant error alerts
export const signUp = ({ name, email, password, password2 }) => async dispatch => {
    try {
        dispatch({ type: USER_LOADING });

        const body = JSON.stringify({ name, email, password, password2 });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/user/sign-up', body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        globalErrorHandler(err, dispatch, authError, true);
    }
};

export const signIn = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: USER_LOADING });
        const body = JSON.stringify({ email, password });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/user/sign-in', body, config);

        dispatch({
            type: SIGNIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        globalErrorHandler(err, dispatch, authError, true);
    }
};

export const signOut = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: SIGNOUT_SUCCESS });
};

// TODO: Custom confirm modal/notification
// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete('/user');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            globalErrorHandler(err, dispatch, authError);
        }
    }
};
