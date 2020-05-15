import { setAlert } from 'redux/alerts';
import { toastTypes } from 'shared/constants';

// TODO
const apiErrorHandler = (err, alertType = toastTypes.ERROR) => async dispatch => {
    if (process.env.NODE_ENV === 'development') console.error(err.response || err);

    if (err.response) {
        const error = err.response.data;
        if (Array.isArray(error)) {
            error.forEach(el => {
                dispatch(setAlert(el.message, toastTypes.ERROR));
            });
        } else {
            dispatch(setAlert(error.message, toastTypes.ERROR));
        }
    }
};

export default apiErrorHandler;
