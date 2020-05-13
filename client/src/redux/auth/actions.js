import { api, apiErrorHandler } from 'shared/utils';
import { setAlert } from 'redux/alerts';
import { deleteProfile, resetProfile } from 'redux/profile';
import {
    SIGN_UP_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    SIGN_IN_SUCCESS,
    RESET_AUTH,
} from 'redux/actionTypes';

export const loadUser = () => async dispatch => {
    try {
        dispatch(userLoading());

        const res = await api.get('/user/me');

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

        const res = await api.post('/auth/sign-up', body, config);

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

        const res = await api.post('/auth/sign-in', body, config);

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

        const res = await api.patch(`/user/me`, body, config);

        dispatch(userLoaded(res.data.data.user));
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

        const res = await api.patch(`/user/me`, body, config);

        if (active) {
            dispatch(userLoaded(res.data.data.user));
        } else {
            dispatch(signOutUser());
            dispatch(setAlert('Your account has been deactivated'));
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

        const res = await api.patch(`/auth/update-password`, body, config);

        dispatch(signInSuccess(res.data.data.token));
        dispatch(setAlert('Your password has been updated'));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const deleteAccount = () => async dispatch => {
    try {
        await api.delete('/user/me');
        dispatch(deleteProfile());
        dispatch(signOutUser());
        dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const signOutUser = () => async dispatch => {
    try {
        dispatch(resetProfile());
        dispatch(resetAuth());
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(authError(err));
    }
};

export const resetAuth = () => ({
    type: RESET_AUTH,
});

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
