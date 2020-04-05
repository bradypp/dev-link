import { setAlert } from 'redux/alerts';

const errorHandler = (err, alertType = 'danger') => async dispatch => {
    if (process.env.NODE_ENV === 'development') console.error(err.response || err);

    if (err.response) {
        const error = err.response.data;
        if (Array.isArray(error)) {
            error.forEach(el => {
                dispatch(setAlert(el.message, alertType));
            });
        } else {
            dispatch(setAlert(error.message, alertType));
        }
    }
};

export default errorHandler;
