import {
    PROFILES_ERROR,
    CLEAR_PROFILES,
    PROFILES_LOADED,
    PROFILES_LOADING,
    SKILLS_LOADED,
} from 'redux/actionTypes';

const initialState = {
    profiles: [],
    skills: [],
    isLoading: false,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILES_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case PROFILES_LOADED:
            return {
                ...state,
                isLoading: false,
                profiles: payload,
            };
        case PROFILES_ERROR:
            return {
                ...state,
                profiles: initialState.profiles,
                isLoading: initialState.isLoading,
                error: payload,
            };
        case CLEAR_PROFILES:
            return {
                ...state,
                ...initialState,
            };
        case SKILLS_LOADED:
            return {
                ...state,
                skills: payload,
            };
        default:
            return state;
    }
};
