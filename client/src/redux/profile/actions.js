import { api, globalErrorHandler } from 'utils';
import { setAlert } from 'redux/alerts/actions';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    GET_REPOS,
    PROFILE_LOADING,
} from 'redux/actionTypes';

// Profile error
export const profileError = () => async dispatch => {
    dispatch({
        type: PROFILE_ERROR,
    });
};

// Get current users profile
export const getCurrentUserProfile = () => async dispatch => {
    try {
        dispatch({ type: PROFILE_LOADING });

        const res = await api.get('/profile');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError);
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    try {
        dispatch({ type: CLEAR_PROFILE });

        const res = await api.get('/profile/all');

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError);
    }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await api.get(`/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError);
    }
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await api.get(`/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError);
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        history.push('/dashboard');
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError, true);
    }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.put('/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError, true);
    }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.put('/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError, true);
    }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError);
    }
};

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        globalErrorHandler(err, dispatch, profileError);
    }
};
