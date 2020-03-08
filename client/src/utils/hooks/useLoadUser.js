import { useEffect } from 'react';
import { store } from 'redux/store';
import { loadUser } from 'redux/auth/actions';
import { setAuthToken } from 'utils';

const useLoadUser = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            store.dispatch(loadUser());
        }
    }, []);
};

export default useLoadUser;
