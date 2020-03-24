import {
    PROFILE_LOADED,
    PROFILES_ERROR,
    CLEAR_PROFILE,
    PROFILES_LOADED,
    REPOS_LOADED,
    PROFILE_LOADING,
    PROFILES_LOADING,
} from 'redux/actionTypes';

const initialState = {
    profile: {},
    profiles: [],
    isProfileLoading: false,
    isProfilesLoading: false,
    userProfile: {},
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILE_LOADING:
            return {
                ...state,
                isProfileLoading: true,
            };
        case PROFILE_LOADED:
            return {
                ...state,
                profile: payload,
                isProfileLoading: false,
                error: {},
            };
        case PROFILES_LOADING:
            return {
                ...state,
                isProfilesLoading: true,
            };
        case PROFILES_LOADED:
            return {
                ...state,
                isProfilesLoading: false,
                profiles: payload,
                error: {},
            };
        case REPOS_LOADED:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    repos: payload,
                },
                error: {},
            };
        case PROFILES_ERROR:
            return {
                ...state,
                isProfileLoading: false,
                isProfilesLoading: false,
                profile: {},
                profiles: [],
                error: payload,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: {},
                isProfileLoading: false,
                isProfilesLoading: false,
            };
        default:
            return state;
    }
};
