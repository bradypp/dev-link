import { api, setAuthToken } from 'utils';
import { setAlert } from 'redux/alerts/actions';
import { REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOADED, AUTH_ERROR } from './actionTypes';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await api.get('/user');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// TODO: Implement more elegant error alerts
export const registerUser = ({ name, email, password, password2 }) => async dispatch => {
    const body = JSON.stringify({ name, email, password, password2 });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await api.post('auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = Object.values(err.response.data);
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: REGISTER_FAILURE,
        });
    }
};
