import { api, apiErrorHandler, url } from 'shared/utils';
import {
    PROFILES_LOADED,
    RECOMMENDED_PROFILES_LOADED,
    PROFILES_ERROR,
    CLEAR_PROFILES,
    PROFILES_LOADING,
    SEARCH_CONSTANTS_LOADED,
    MORE_PROFILES_LOADING,
    MORE_PROFILES_LOADED,
    CLEAR_RECOMMENDED_PROFILES,
} from 'redux/actionTypes';

export const getProfiles = (queryObj = null) => async dispatch => {
    try {
        dispatch(resetProfiles());
        dispatch(profilesLoading());

        if (queryObj) {
            const queryString = url.objectToQueryString(queryObj);
            const res = await api.get(`/api/v1/profile/all?${queryString}`);
            dispatch(profilesLoaded(res.data.data.profiles));
        } else {
            const res = await api.get(`/api/v1/profile/all`);
            dispatch(profilesLoaded(res.data.data.profiles));
        }
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getRecommendedProfiles = queryObj => async dispatch => {
    try {
        dispatch(clearRecommendedProfiles());
        dispatch(profilesLoading());
        const queryString = url.objectToQueryString(queryObj);
        const res = await api.get(`/api/v1/profile/all?${queryString}`);
        dispatch(recommendedProfilesLoaded(res.data.data.profiles));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getMoreProfiles = queryObj => async dispatch => {
    try {
        dispatch(moreProfilesLoading());
        const queryString = url.objectToQueryString(queryObj);
        const res = await api.get(`/api/v1/profile/all?${queryString}`);
        dispatch(moreProfilesLoaded(res.data.data.profiles));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const getSearchConstants = () => async dispatch => {
    try {
        const res = await api.get(`/api/v1/profile/all?fields=skills,desired_roles,-user`);
        const skills = new Set(
            res.data.data.profiles
                .map(profile => profile.skills)
                .flat()
                .map(skill => skill.toLowerCase()),
        );
        const desiredRoles = new Set(
            res.data.data.profiles
                .map(profile => profile.desired_roles)
                .flat()
                .map(role => role.toLowerCase()),
        );

        dispatch(
            searchConstantsLoaded({
                allSkills: Array.from(skills).sort((a, b) =>
                    a.toLowerCase() < b.toLowerCase() ? -1 : 1,
                ),
                allDesiredRoles: Array.from(desiredRoles).sort((a, b) =>
                    a.toLowerCase() < b.toLowerCase() ? -1 : 1,
                ),
            }),
        );
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const resetProfiles = () => ({
    type: CLEAR_PROFILES,
});

export const clearRecommendedProfiles = () => ({
    type: CLEAR_RECOMMENDED_PROFILES,
});

export const profilesError = () => ({
    type: PROFILES_ERROR,
});

export const profilesLoading = () => ({
    type: PROFILES_LOADING,
});

export const moreProfilesLoading = () => ({
    type: MORE_PROFILES_LOADING,
});

export const profilesLoaded = payload => ({
    type: PROFILES_LOADED,
    payload,
});

export const recommendedProfilesLoaded = payload => ({
    type: RECOMMENDED_PROFILES_LOADED,
    payload,
});

export const moreProfilesLoaded = payload => ({
    type: MORE_PROFILES_LOADED,
    payload,
});

export const searchConstantsLoaded = payload => ({
    type: SEARCH_CONSTANTS_LOADED,
    payload,
});
