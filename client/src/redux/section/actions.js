import { ACTION_TYPE } from './actionTypes';

export const actionName = payload => ({
    type: ACTION_TYPE,
    payload,
});
