import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { loadUser, selectToken, selectUser } from 'redux/auth';
import { setAuthToken } from 'shared/utils';
import useClearAlerts from './useClearAlerts';

const useLoadUser = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    if (token) {
        setAuthToken(token);
    }

    useClearAlerts();

    useEffect(() => {
        if (isEmpty(user)) dispatch(loadUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useLoadUser;
