import {
    GET_PROFILE,
    PROFILES_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_LOADING,
} from 'redux/actionTypes';

const initialState = {
    profile: {},
    profiles: [],
    profileLoading: false,
    profilesLoading: false,
    userProfile: {},
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE: {
            return {
                ...state,
                profile: payload,
                isLoading: false,
                error: {},
            };
        }
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_PROFILES: {
            return {
                ...state,
                profilesLoading: false,
                profileLoading: false,
                profiles: payload,
                profile: {},
                error: {},
            };
        }
        case PROFILES_ERROR:
            return {
                ...state,
                isLoading: false,
                profile: {},
                error: payload,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: {},
                repos: [],
                isLoading: false,
                error: {},
            };
        case GET_REPOS: {
            return {
                ...state,
                isLoading: false,
                profile: {
                    ...state.profile,
                    repos: payload,
                },
                error: {},
            };
        }
        default:
            return state;
    }
};
