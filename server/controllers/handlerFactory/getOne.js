const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const getOne = async (req, res, next, Model, config, conditions) => {
    const selectOptions = config.selectOptions || null;
    const populateOptions = config.populateOptions || null;
    const errorMessage = config.errorMessage || 'No document found with that ID';

    let query = Model.findOne(conditions);
    if (selectOptions) query = query.select(selectOptions);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
        return next(new AppError(errorMessage, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            [Model.modelName.toLowerCase()]: doc,
        },
    });
};

exports.getOneById = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        getOne(req, res, next, Model, config, { _id: req.params.id });
    });

exports.getOneByUserId = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        getOne(req, res, next, Model, config, { user: req.params.userId });
    });
