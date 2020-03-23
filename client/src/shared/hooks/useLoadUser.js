import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { loadUser, selectToken, selectUser } from 'redux/auth';
import { setAuthToken } from 'shared/utils';

const useLoadUser = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    if (token) {
        setAuthToken(token);
    }

    useEffect(() => {
        if (isEmpty(user)) dispatch(loadUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useLoadUser;
