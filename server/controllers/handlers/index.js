const createOne = require('./createOne');
const deleteOne = require('./deleteOne');
const getAll = require('./getAll');
const getOne = require('./getOne');
const updateOne = require('./updateOne');

module.exports = {
    ...createOne,
    ...deleteOne,
    ...getAll,
    ...getOne,
    ...updateOne,
};
