import {
    PROFILE_LOADED,
    PROFILE_ERROR,
    RESET_PROFILE,
    PROFILE_LOADING,
    SET_IS_CURRENT_USER,
    SIGN_OUT,
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
                profile: initialState.profile,
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
        case SIGN_OUT:
            return {
                ...state,
                isLoading: initialState.isLoading,
                isCurrentUser: initialState.isCurrentUser,
            };
        case RESET_PROFILE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
