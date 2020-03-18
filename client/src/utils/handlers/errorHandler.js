import { setAlert } from 'redux/alerts';
import { setErrors } from 'redux/errors';

const handleError = (err, dispatch, shouldSendAlert, alertType) => {
    if (err.response) {
        const error = err.response.data;
        if (shouldSendAlert) {
            if (Array.isArray(error)) {
                error.forEach(el => {
                    dispatch(setAlert(el.message, alertType));
                });
            } else {
                dispatch(setAlert(err.message, alertType));
            }
        }
    }
    dispatch(setErrors(err));
};

// TODO: Refactor so that it's possible to specify what to do with each type of error. E.g. specify when to send alerts and their type depending on error type not generalized in method params. Might need to put a name on the errors on the backend so that you can specify what to do with each.
const errorHandler = (
    err,
    dispatch = null,
    action = null,
    shouldSendAlert = false,
    alertType = 'danger',
) => {
    if (process.env.NODE_ENV === 'development') console.error(err);

    handleError(err, dispatch, shouldSendAlert, alertType);

    if (action) dispatch(action());
};

export default errorHandler;
