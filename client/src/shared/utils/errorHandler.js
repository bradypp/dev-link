import { setAlert } from 'redux/alerts';

// TODO: Improve Error Handling
// Put a name on the errors on the backend so that you can specify what to do with each.
// Send validation errors in an object with status: fail, name: 'validation', errors: [{...}]
// Check for names before deciding what to do with them & a default for no name & no dispatch
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
