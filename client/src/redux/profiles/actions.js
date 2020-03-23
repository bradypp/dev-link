import { api, errorHandler } from 'shared/utils';
import { setAlert } from 'redux/alerts/actions';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILES_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    GET_REPOS,
    PROFILE_LOADING,
} from 'redux/actionTypes';

export const getCurrentUserProfile = () => async dispatch => {
    try {
        dispatch(profileLoading());

        const res = await api.get('/profile');

        dispatch(getProfile(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getProfiles = () => async dispatch => {
    try {
        dispatch(clearProfile());

        const res = await api.get('/profile/all');

        dispatch({
            type: GET_PROFILES,
            payload: res.data.data.profiles,
        });
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getProfileById = userId => async dispatch => {
    try {
        const res = await api.get(`/profile/user/${userId}`);

        dispatch(getProfile(res.data.data.profile));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getGithubRepos = username => async dispatch => {
    try {
        const res = await api.get(`/profile/github/${username}`);

        dispatch(getRepos(res.data.data.repos));
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

        dispatch(getProfile(res.data.data.profile));

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

        dispatch(updateProfile(res.data.data.profile));

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

        dispatch(updateProfile(res.data.data.profile));

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

        dispatch(updateProfile(res.data.data.profile));

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch(updateProfile(res.data.data.profile));

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

export const updateProfile = payload => ({
    type: UPDATE_PROFILE,
    payload,
});

export const getProfile = payload => ({
    type: GET_PROFILE,
    payload,
});

export const getRepos = payload => ({
    type: GET_REPOS,
    payload,
});
