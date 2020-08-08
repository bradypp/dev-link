import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState(location);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (location !== prevLocation) {
            window.scrollTo(0, 0);
            setPrevLocation(location);
        }
    }, [location, prevLocation]);

    return children;
};

export default ScrollToTop;
