import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
    const [prevPathname, setPrevPathname] = useState(pathname);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (pathname !== prevPathname) {
            window.scrollTo(0, 0);
            setPrevPathname(pathname);
        }
    }, [pathname, prevPathname]);

    return children;
};

export default ScrollToTop;
