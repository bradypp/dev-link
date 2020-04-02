const catchAsync = require('../../utils/catchAsync');

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = new Model(req.body);
        await doc.save();
        res.status(201).json({
            status: 'success',
            data: {
                [Model.modelName.toLowerCase()]: doc,
            },
        });
    });
