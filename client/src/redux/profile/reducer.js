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
                profile: payload,
                isLoading: initialState.isLoading,
            };

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: initialState.isLoading,
                profile: initialState.profile,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: initialState.profile,
                isLoading: initialState.isLoading,
            };
        default:
            return state;
    }
};
