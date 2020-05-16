const { AppError, catchAsync, omitKeyValuePairs } = require('../../utils');

exports.createOne = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        const errorMessage = config.errorMessage || 'Document with that ID already exists';
        const fieldsToOmit = config.fieldsToOmit || [];
        const data = omitKeyValuePairs(req.body, fieldsToOmit);
        const options = config.options || {};

        if (await Model.findById(req.params.id)) {
            return next(new AppError(errorMessage, 400));
        }

        const doc = await Model.create(data, {
            ...options,
        });

        res.status(201).json({
            status: 'success',
            data: {
                [Model.modelName.toLowerCase()]: doc,
            },
        });
    });
