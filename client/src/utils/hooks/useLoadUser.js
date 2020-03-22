import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { loadUser, selectToken, selectUserData } from 'redux/profile/auth';
import { setAuthToken } from 'utils';

const useLoadUser = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUserData);

    if (token) {
        setAuthToken(token);
    }

    useEffect(() => {
        if (isEmpty(user)) dispatch(loadUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useLoadUser;
