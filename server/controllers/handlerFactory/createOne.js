const catchAsync = require('../../utils/catchAsync');

exports.createOne = (Model, data = null) =>
    catchAsync(async (req, res, next) => {
        const newData = data || req.body;
        const doc = new Model(newData);
        await doc.save();
        res.status(201).json({
            status: 'success',
            data: {
                [Model.modelName.toLowerCase()]: doc,
            },
        });
    });
