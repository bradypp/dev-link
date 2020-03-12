import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_LOADING,
} from 'redux/actionTypes';

// TODO: Have separate user profile saved
// TODO: If going to profile from profiles list, use the already gathered profile data to fill current profile data
const initialState = {
    profileData: {},
    profiles: [],
    repos: [],
    isLoading: false,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profileData: payload,
                isLoading: false,
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
                isLoading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false,
                profileData: {},
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profileData: {},
                repos: [],
                isLoading: false,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                isLoading: false,
            };
        default:
            return state;
    }
};
