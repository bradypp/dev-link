import { api, errorHandler } from 'shared/utils';
import { setAlert } from 'redux/alerts';
import { clearProfile, deleteProfile } from 'redux/profiles';
import {
    SIGN_UP_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    SIGN_IN_SUCCESS,
    SIGN_OUT_USER,
} from 'redux/actionTypes';

export const loadUser = () => async dispatch => {
    try {
        dispatch(userLoading());

        const res = await api.get('/user/me');

        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(authError(err));
    }
};

export const signUp = ({ name, email, password, password2 }) => async dispatch => {
    try {
        dispatch(userLoading());

        const body = JSON.stringify({ name, email, password, password2 });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/auth/sign-up', body, config);

        dispatch(signUpSuccess(res.data.data.token));
        dispatch(loadUser());
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(authError(err));
    }
};

export const signIn = ({ email, password }) => async dispatch => {
    try {
        dispatch(userLoading());
        const body = JSON.stringify({ email, password });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/auth/sign-in', body, config);

        dispatch(signInSuccess(res.data.data.token));
        dispatch(loadUser());
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(authError(err));
    }
};

export const signOut = () => dispatch => {
    dispatch(signOutUser());
};

// TODO: add confirm modal
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete('/user');
            dispatch(deleteProfile());
            dispatch(signOutUser());
            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            dispatch(errorHandler(err));
            dispatch(authError(err));
        }
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

export const signOutUser = () => ({
    type: SIGN_OUT_USER,
});
