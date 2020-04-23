import { useState, useEffect } from 'react';

const useIsFirstRender = () => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    return isFirstRender;
};

export default useIsFirstRender;
