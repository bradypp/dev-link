import { ACTION_TYPE } from './actionTypes';

const initialState = {};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPE:
            return { ...state, ...payload };
        default:
            return state;
    }
};
