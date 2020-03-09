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
    profile: null,
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
                profile: payload,
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
                profile: null,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
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
