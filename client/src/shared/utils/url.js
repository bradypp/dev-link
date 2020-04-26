import queryString from 'query-string';
import { omit } from 'lodash';

const queryStringToObject = (str, options = {}) =>
    queryString.parse(str, {
        arrayFormat: 'bracket',
        ...options,
    });

const objectToQueryString = (obj, options = {}) =>
    queryString.stringify(obj, {
        arrayFormat: 'bracket',
        ...options,
    });

const omitFromQueryString = (str, keys) =>
    objectToQueryString(omit(queryStringToObject(str), keys));

const addToQueryString = (str, fields) =>
    objectToQueryString({
        ...queryStringToObject(str),
        ...fields,
    });

export default {
    queryStringToObject,
    objectToQueryString,
    omitFromQueryString,
    addToQueryString,
};
