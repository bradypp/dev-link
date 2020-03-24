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

export const getCurrentUserProfile = () => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get('/profile');

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getProfiles = () => async dispatch => {
    try {
        dispatch(clearProfile());
        dispatch(profilesLoading());

        const res = await api.get('/profile/all');

        dispatch(profilesLoaded(res.data.data.profiles));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getProfileById = userId => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get(`/profile/user/${userId}`);

        dispatch(profileLoaded(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getGithubRepos = username => async dispatch => {
    try {
        const res = await api.get(`/profile/github/${username}`);

        dispatch(reposLoaded(res.data.data.repos));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/profile', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.put('/profile/experience', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.put('/profile/education', formData, config);

        dispatch(profileLoaded(res.data.data.profile));
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

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
