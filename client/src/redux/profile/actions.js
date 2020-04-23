import { api, errorHandler } from 'shared/utils';
import { setAlert } from 'redux/alerts';
import { userLoaded } from 'redux/auth';
import { PROFILE_LOADING, PROFILE_LOADED, PROFILE_ERROR, CLEAR_PROFILE } from 'redux/actionTypes';

export const getProfileByUsername = username => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/profile/?username=${username}`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profileError(err));
    }
};

export const getProfileById = userId => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/user/${userId}/profile`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profileError(err));
    }
};

export const getCurrentUserProfile = () => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/profile/me`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profileError(err));
    }
};

export const createUpdateProfile = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/profile/me', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        // TODO: decide whether to keep this alert
        dispatch(setAlert('Profile Updated', 'success'));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profileError(err));
    }
};

export const toggleStar = profileId => async dispatch => {
    try {
        const res = await api.patch(`/profile/${profileId}/star`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profileError(err));
    }
};

export const toggleWatch = profileId => async dispatch => {
    try {
        const res = await api.patch(`/profile/${profileId}/watch`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(userLoaded(res.data.data.user));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profileError(err));
    }
};

export const deleteProfile = () => async dispatch => {
    try {
        await api.delete('/profile/me');
        dispatch(clearProfile());
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profileError(err));
    }
};

export const clearProfile = () => ({
    type: CLEAR_PROFILE,
});

export const profileError = () => ({
    type: PROFILE_ERROR,
});

export const profileLoading = () => ({
    type: PROFILE_LOADING,
});

export const profileLoaded = payload => ({
    type: PROFILE_LOADED,
    payload,
});
