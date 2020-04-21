import {
    queryStringToObject,
    addToQueryString,
    omitFromQueryString,
    browserHistory,
} from 'shared/utils';

const open = param =>
    browserHistory.push({
        pathname: browserHistory.location.pathname,
        search: addToQueryString(browserHistory.location.search, { [`modal-${param}`]: true }),
    });

const close = param =>
    browserHistory.push({
        pathname: browserHistory.location.pathname,
        search: omitFromQueryString(browserHistory.location.search, [`modal-${param}`]),
    });

const isOpen = param => !!queryStringToObject(browserHistory.location.search)[`modal-${param}`];

export default param => ({
    open: () => open(param),
    close: () => close(param),
    isOpen: () => isOpen(param),
});
