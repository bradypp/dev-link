import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from 'redux/actionTypes';

export const setAlert = (message, alertType = 'danger', timeout = 3000) => dispatch => {
    console.log(message);
    const id = uuidv4();

    dispatch({
        type: SET_ALERT,
        payload: { id, message, alertType },
    });

    setTimeout(() => dispatch(removeAlert(id)), timeout);
};

export const clearAlerts = () => ({
    type: CLEAR_ALERTS,
});

export const removeAlert = payload => ({
    type: REMOVE_ALERT,
    payload,
});
