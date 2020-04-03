const { AppError, catchAsync } = require('../../utils');

const deleteOne = async (req, res, next, Model, config, conditions) => {
    const errorMessage = config.errorMessage || 'No document found with that ID';

    if (!(await Model.findOneAndRemove(conditions))) {
        return next(new AppError(errorMessage, 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

exports.deleteOneById = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        deleteOne(req, res, next, Model, config, { _id: req.params.id });
    });

exports.deleteOneByUserId = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        deleteOne(req, res, next, Model, config, { user: req.params.userId });
    });
