import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from 'redux/actionTypes';

export const setAlert = (message, alertType = 'danger', timeout = 3000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { id, message, alertType },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const clearAlerts = () => dispatch => {
    dispatch({ type: CLEAR_ALERTS });
};
