import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_LOADING,
} from 'redux/actionTypes';

const initialState = {
    profileData: {},
    profiles: [],
    repos: [],
    isLoading: false,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    const { profileData, repos, isLoading } = initialState;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profileData: payload,
                isLoading,
            };
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                isLoading,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading,
                profileData,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profileData,
                repos,
                isLoading,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                isLoading,
            };
        default:
            return state;
    }
};
