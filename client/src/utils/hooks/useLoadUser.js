import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, selectToken, selectUserData } from 'redux/auth';
import { setAuthToken } from 'utils';

const useLoadUser = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUserData);

    if (token) {
        setAuthToken(token);
    }

    useEffect(() => {
        if (!user) dispatch(loadUser());
    }, [dispatch, user]);
};

export default useLoadUser;
