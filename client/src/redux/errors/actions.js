import { SET_ERRORS } from 'redux/actionTypes';

export const setErrors = err => dispatch => {
    dispatch({
        type: SET_ERRORS,
        payload: { ...err },
    });
};
