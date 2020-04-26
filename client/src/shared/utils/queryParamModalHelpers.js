import { url, browserHistory } from 'shared/utils';

const open = param =>
    browserHistory.push({
        pathname: browserHistory.location.pathname,
        search: url.addToQueryString(browserHistory.location.search, { [`modal-${param}`]: true }),
    });

const close = param =>
    browserHistory.push({
        pathname: browserHistory.location.pathname,
        search: url.omitFromQueryString(browserHistory.location.search, [`modal-${param}`]),
    });

const isOpen = param => !!url.queryStringToObject(browserHistory.location.search)[`modal-${param}`];

export default param => ({
    open: () => open(param),
    close: () => close(param),
    isOpen: () => isOpen(param),
});
