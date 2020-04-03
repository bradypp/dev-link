const { AppError, catchAsync, omitKeyValuePairs } = require('../../utils');

// Don't update user passwords using this (User.save() needs to be used for the update/reset password middlewares to run)
const updateOne = async (req, res, next, Model, config, conditions) => {
    const options = config.options || {};
    const errorMessage = config.errorMessage || 'No document found with that ID';
    const fieldsToOmit = config.fieldsToOmit || [];
    const data = omitKeyValuePairs({ ...req.body }, fieldsToOmit);

    const doc = await Model.findOneAndUpdate(conditions, data, {
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

exports.updateOneById = (Model, config = {}) =>
    catchAsync(async (req, res, next) =>
        updateOne(req, res, next, Model, config, { _id: req.params.id }),
    );

exports.updateOneByUserId = (Model, config = {}) =>
    catchAsync(async (req, res, next) =>
        updateOne(req, res, next, Model, config, { user: req.params.userId }),
    );
