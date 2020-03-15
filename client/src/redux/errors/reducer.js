import { SET_ERRORS } from 'redux/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ERRORS: {
            const errors = [...state, payload];
            return errors.length > 5 ? errors.slice(1, 5) : errors;
        }
        default:
            return state;
    }
};
