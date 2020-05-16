import { api, apiErrorHandler } from 'shared/utils';
import { setAlert } from 'redux/alerts';
import { toastTypes } from 'shared/constants';
import { deleteProfile } from 'redux/profile';
import {
    SIGN_UP_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    SIGN_IN_SUCCESS,
    SIGN_OUT,
} from 'redux/actionTypes';

export const loadUser = () => async dispatch => {
    try {
        dispatch(userLoading());

        const res = await api.get('/api/v1/user/me');

        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(authError(err));
    }
};

export const signUp = ({ name, username, email, password, password2 }) => async dispatch => {
    try {
        dispatch(userLoading());

        const body = JSON.stringify({ name, username, email, password, password2 });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/api/v1/auth/sign-up', body, config);

        dispatch(signUpSuccess(res.data.data.token));
        dispatch(loadUser());
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const signIn = ({ login, password }) => async dispatch => {
    try {
        dispatch(userLoading());

        const body = JSON.stringify({ login, password });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/api/v1/auth/sign-in', body, config);

        dispatch(signInSuccess(res.data.data.token));
        dispatch(loadUser());
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const updateUser = ({ name, username, email }) => async dispatch => {
    try {
        const body = JSON.stringify({ name, username, email });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch(`/api/v1/user/me`, body, config);

        dispatch(userLoaded(res.data.data.user));
        dispatch(setAlert('Your account has been successfully updated', toastTypes.SUCCESS));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const updateActiveStatus = ({ active }) => async dispatch => {
    try {
        const body = JSON.stringify({ active });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch(`/api/v1/user/me`, body, config);

        if (active) {
            dispatch(userLoaded(res.data.data.user));
        } else {
            dispatch(signOut());
            dispatch(
                setAlert('Your account has successfully been deactivated', toastTypes.SUCCESS),
            );
        }
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const updatePassword = ({ current_password, password, password2 }) => async dispatch => {
    try {
        const body = JSON.stringify({ current_password, password, password2 });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch(`/api/v1/auth/update-password`, body, config);

        dispatch(signInSuccess(res.data.data.token));
        dispatch(setAlert('Your password has successfully been updated', toastTypes.SUCCESS));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const deleteAccount = () => async dispatch => {
    try {
        await api.delete('/api/v1/user/me');
        dispatch(deleteProfile());
        dispatch(signOut());
        dispatch(setAlert('Your account has been permanently deleted', toastTypes.SUCCESS));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const signOut = () => async dispatch => {
    try {
        await api.post('/api/v1/auth/sign-out');
        dispatch({
            type: SIGN_OUT,
        });
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const authError = payload => ({
    type: AUTH_ERROR,
    payload,
});

export const userLoading = () => ({
    type: USER_LOADING,
});

export const userLoaded = payload => ({
    type: USER_LOADED,
    payload,
});

export const signUpSuccess = payload => ({
    type: SIGN_UP_SUCCESS,
    payload,
});

export const signInSuccess = payload => ({
    type: SIGN_IN_SUCCESS,
    payload,
});
