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
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE: {
            const { profile } = payload.data;
            return {
                ...state,
                profileData: profile,
                isLoading: false,
            };
        }
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_PROFILES: {
            const { profiles } = payload.data;
            return {
                ...state,
                isLoading: false,
                profiles,
            };
        }
        case PROFILE_ERROR:
            return {
                ...state,
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
        case GET_REPOS: {
            const { repos } = payload.data;
            return {
                ...state,
                isLoading: false,
                repos,
            };
        }
        default:
            return state;
    }
};
