import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAlerts } from 'redux/alerts';

const useClearAlerts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearAlerts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useClearAlerts;
