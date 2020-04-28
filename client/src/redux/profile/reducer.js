import {
    PROFILE_LOADED,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    PROFILE_LOADING,
    SET_IS_CURRENT_USER,
} from 'redux/actionTypes';

const initialState = {
    profile: {},
    isLoading: false,
    isCurrentUser: false,
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
        case SET_IS_CURRENT_USER:
            return {
                ...state,
                isCurrentUser: payload,
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
