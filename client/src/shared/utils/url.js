import queryString from 'query-string';
import { omit } from 'lodash';

// queryString.parse('arr=1,2,3', {arrayFormat: 'comma'});
// { arr: ['1', '2', '3'] }

const queryStringToObject = (str, options = {}) =>
    queryString.parse(str, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
        ...options,
    });

const objectToQueryString = (obj, options = {}) =>
    queryString.stringify(obj, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
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
