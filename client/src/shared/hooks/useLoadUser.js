import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, selectToken, selectIsAuthenticated } from 'redux/auth';
import { setAuthToken } from 'shared/utils';
import useClearAlerts from './useClearAlerts';

const useLoadUser = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (token) {
        setAuthToken(token);
    }

    useClearAlerts();

    useEffect(() => {
        if (!isAuthenticated) dispatch(loadUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useLoadUser;
