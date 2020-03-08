import { useEffect } from 'react';
import { store } from 'redux/store';
import { loadUser } from 'redux/auth/actions';
import { setAuthToken } from 'utils';

const useLoadUser = () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
};

export default useLoadUser;
