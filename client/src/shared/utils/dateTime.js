import moment from 'moment';

export const formatDate = (date, format = 'DD/MM/YYYY') =>
    date ? moment(date).format(format) : date;

export const formatDateTime = (date, format = 'DD/MM/YYYY, h:mm A') =>
    date ? moment(date).format(format) : date;

export const formatDateTimeForAPI = date =>
    date
        ? moment(date)
              .utc()
              .format()
        : date;

export const formatDateTimeConversational = date => (date ? moment(date).fromNow() : date);
