import { api, errorHandler } from 'shared/utils';
import {
    PROFILES_LOADED,
    PROFILES_ERROR,
    CLEAR_PROFILES,
    PROFILES_LOADING,
} from 'redux/actionTypes';

export const getProfiles = () => async (dispatch, queryParams = '') => {
    try {
        dispatch(clearProfiles());
        dispatch(profilesLoading());

        const res = await api.get(`/profile/all/${queryParams}`);

        dispatch(profilesLoaded(res.data.data.profiles));
    } catch (err) {
        dispatch(errorHandler(err));
        dispatch(profilesError(err));
    }
};

export const clearProfiles = () => ({
    type: CLEAR_PROFILES,
});

export const profilesError = () => ({
    type: PROFILES_ERROR,
});

export const profilesLoading = () => ({
    type: PROFILES_LOADING,
});

export const profilesLoaded = payload => ({
    type: PROFILES_LOADED,
    payload,
});
