const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

// Don't update user passwords using this (User.save() needs to be used for the update/reset password middlewares to run)
const updateOne = async (req, res, next, Model, config, conditions) => {
    const options = config.options || {};
    const errorMessage = config.errorMessage || 'No document found with that ID';

    const doc = await Model.findOneAndUpdate(conditions, req.body, {
        new: true,
        runValidators: true,
        ...options,
    });

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

exports.updateOneByIdParams = (Model, config = {}) =>
    catchAsync(async (req, res, next) =>
        updateOne(req, res, next, Model, config, { _id: req.params.id }),
    );

exports.updateOneByIdCurrentUser = (Model, config = {}) =>
    catchAsync(async (req, res, next) =>
        updateOne(req, res, next, Model, config, { _id: req.user.id }),
    );

exports.updateOneByCurrentUser = (Model, config = {}) =>
    catchAsync(async (req, res, next) =>
        updateOne(req, res, next, Model, config, { user: req.user.id }),
    );
