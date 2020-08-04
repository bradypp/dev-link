import moment from 'moment';

const formatDate = (date, format = 'MM/DD/YYYY') => (date ? moment(date).format(format) : date);

const formatDateTime = (date, format = 'MM/DD/YYYY, h:mm A') =>
    date ? moment(date).format(format) : date;

const formatDateTimeForAPI = date => {
    const formattedDate = moment(date)
        .utc()
        .format();
    return formattedDate !== 'Invalid date' ? formattedDate : date;
};

const formatDateTimeConversational = date => (date ? moment(date).fromNow() : date);

export default {
    formatDate,
    formatDateTime,
    formatDateTimeForAPI,
    formatDateTimeConversational,
};
