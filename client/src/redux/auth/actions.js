import api from 'utils/api';
import { setAlert } from 'redux/alerts/actions';
import { REGISTER_SUCCESS, REGISTER_FAILURE } from './actionTypes';

// TODO: Implement more elegant error alerts

export const registerUser = ({ name, email, password, password2 }) => async dispatch => {
    try {
        const body = JSON.stringify({ name, email, password, password2 });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

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
