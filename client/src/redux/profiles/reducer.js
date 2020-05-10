import {
    PROFILES_ERROR,
    CLEAR_PROFILES,
    PROFILES_LOADED,
    PROFILES_LOADING,
    SEARCH_CONSTANTS_LOADED,
    MORE_PROFILES_LOADING,
    MORE_PROFILES_LOADED,
} from 'redux/actionTypes';

const initialState = {
    profiles: [],
    allSkills: [],
    allDesiredRoles: [],
    isProfilesLoading: false,
    isMoreProfilesLoading: false,
    isNoMoreProfiles: false,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILES_LOADING:
            return {
                ...state,
                isProfilesLoading: true,
            };
        case MORE_PROFILES_LOADING:
            return {
                ...state,
                isMoreProfilesLoading: true,
            };
        case PROFILES_LOADED:
            return {
                ...state,
                isProfilesLoading: false,
                profiles: payload,
            };
        case MORE_PROFILES_LOADED:
            return {
                ...state,
                isMoreProfilesLoading: false,
                profiles: [...state.profiles, ...payload],
                isNoMoreProfiles: payload.length === 0,
            };
        case PROFILES_ERROR:
            return {
                ...state,
                profiles: initialState.profiles,
                isProfilesLoading: initialState.isProfilesLoading,
                isMoreProfilesLoading: initialState.isMoreProfilesLoading,
                isNoMoreProfiles: initialState.isNoMoreProfiles,
                error: payload,
            };
        case CLEAR_PROFILES:
            return {
                ...state,
                ...initialState,
            };
        case SEARCH_CONSTANTS_LOADED:
            return {
                ...state,
                allSkills: payload.allSkills,
                allDesiredRoles: payload.allDesiredRoles,
            };
        default:
            return state;
    }
};
