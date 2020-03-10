import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, selectToken, selectUser } from 'redux/auth';
import { setAuthToken } from 'utils';

const useLoadUser = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    if (token) {
        setAuthToken(token);
    }

    useEffect(() => {
        if (!user) dispatch(loadUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
};

export default useLoadUser;
