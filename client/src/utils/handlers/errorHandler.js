import { setAlert } from 'redux/alerts';
import { setErrors } from 'redux/errors';

const handleError = (err, dispatch, shouldSendAlert, alertType) => {
    if (shouldSendAlert) dispatch(setAlert(err.message, alertType));
    dispatch(setErrors(err));
};

const errorHandler = (
    err,
    dispatch = null,
    action = null,
    shouldSendAlert = false,
    alertType = 'danger',
) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(err.response);
    }

    const error = err.response.data;
    if (Array.isArray(error)) {
        error.forEach(err => handleError(err, dispatch, shouldSendAlert, alertType));
    } else {
        handleError(error, dispatch, shouldSendAlert, alertType);
    }

    if (action) dispatch(action());
};

export default errorHandler;
