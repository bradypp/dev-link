import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts, selectAlerts } from 'redux/alerts';

const useClearAlerts = () => {
    const dispatch = useDispatch();
    const alerts = useSelector(selectAlerts);

    useEffect(() => {
        if (alerts.length > 0) {
            dispatch(clearAlerts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useClearAlerts;
