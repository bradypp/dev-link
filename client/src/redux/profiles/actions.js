import { api, apiErrorHandler } from 'shared/utils';
import {
    PROFILES_LOADED,
    PROFILES_ERROR,
    CLEAR_PROFILES,
    PROFILES_LOADING,
    SKILLS_LOADED,
} from 'redux/actionTypes';
import { url } from 'shared/utils';

export const getProfiles = (queryParams = null) => async dispatch => {
    try {
        dispatch(clearProfiles());
        dispatch(profilesLoading());

        if (queryParams) {
            const queryString = url.objectToQueryString(queryParams);
            const res = await api.get(`/profile/all/?${queryString}`);
            dispatch(profilesLoaded(res.data.data.profiles));
        } else {
            const res = await api.get(`/profile/all`);
            dispatch(profilesLoaded(res.data.data.profiles));
        }
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getSkills = () => async dispatch => {
    try {
        const res = await api.get(`/profile/all?fields=skills`);
        const skills = new Set(res.data.data.profiles.map(profile => profile.skills).flat());

        dispatch(
            skillsLoaded(
                Array.from(skills).sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1)),
            ),
        );
    } catch (err) {
        dispatch(apiErrorHandler(err));
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

export const skillsLoaded = payload => ({
    type: SKILLS_LOADED,
    payload,
});
