import { api, errorHandler } from 'shared/utils';
import { setAlert } from 'redux/alerts/actions';
import {
    PROFILE_LOADED,
    PROFILES_LOADED,
    PROFILES_ERROR,
    CLEAR_PROFILE,
    REPOS_LOADED,
    PROFILE_LOADING,
    PROFILES_LOADING,
} from 'redux/actionTypes';

export const getProfiles = () => async (dispatch, queryParams = '') => {
    try {
        dispatch(clearProfile());
        dispatch(profilesLoading());

        const res = await api.get(`/profile/all/${queryParams}`);

        dispatch(profilesLoaded(res.data.data.profiles));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getProfile = userId => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/user/${userId}/profile`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getCurrentUserProfile = () => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/profile/me`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getGithubRepos = username => async dispatch => {
    try {
        const res = await api.get(`/profile/githubRepos/${username}`);

        dispatch(reposLoaded(res.data.data.repos));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const createProfile = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/profile/me', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        // TODO: decide whether to keep this alert
        dispatch(setAlert('Profile Created', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

// formData = only the profile fields you want to update
export const updateProfile = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch('/profile/me', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        // TODO: decide whether to keep this alert
        dispatch(setAlert('Profile Updated', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

// TODO: delete if not needed (if validation can be done in front end therefore allowed in create/updateProfile routes)
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch('/profile/experience', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

// TODO: delete if not needed (if validation can be done in front end therefore allowed in create/updateProfile routes)
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.patch('/profile/education', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

// TODO: delete if not needed (if validation can be done in front end therefore allowed in create/updateProfile routes)
export const deleteExperience = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

// TODO: delete if not needed (if validation can be done in front end therefore allowed in create/updateProfile routes)
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const deleteProfile = () => async dispatch => {
    try {
        await api.delete('/profile/me');
        dispatch(clearProfile());
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const clearProfile = () => ({
    type: CLEAR_PROFILE,
});

export const profilesError = () => ({
    type: PROFILES_ERROR,
});

export const profileLoading = () => ({
    type: PROFILE_LOADING,
});

export const profilesLoading = () => ({
    type: PROFILES_LOADING,
});

export const profileLoaded = payload => ({
    type: PROFILE_LOADED,
    payload,
});

export const profilesLoaded = payload => ({
    type: PROFILES_LOADED,
    payload,
});

export const reposLoaded = payload => ({
    type: REPOS_LOADED,
    payload,
});
