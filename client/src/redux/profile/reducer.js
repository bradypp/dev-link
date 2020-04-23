import { PROFILE_LOADED, PROFILE_ERROR, CLEAR_PROFILE, PROFILE_LOADING } from 'redux/actionTypes';

const initialState = {
    profile: {},
    isLoading: false,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case PROFILE_LOADED:
            return {
                ...state,
                currentProfile: payload,
                isLoading: initialState.isLoading,
            };

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: initialState.isLoading,
                currentProfile: initialState.currentProfile,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                currentProfile: initialState.currentProfile,
                isLoading: initialState.isLoading,
            };
        default:
            return state;
    }
};
