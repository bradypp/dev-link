const omitKeyValuePairs = (obj, fieldsToOmit) =>
    fieldsToOmit.reduce(
        (acc, field) => {
            const newData = { ...acc };
            delete newData[field];
            return newData;
        },
        { ...obj },
    );

module.exports = omitKeyValuePairs;
