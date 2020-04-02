const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const QueryHandler = require('../queryHandler');

exports.getAll = (Model, errorMessage = 'No document found with that ID') =>
    catchAsync(async (req, res, next) => {
        const features = new QueryHandler(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // const doc = await features.query.explain();
        const doc = await features.query;

        if (!doc) {
            return next(new AppError(errorMessage, 404));
        }

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                [Model.collection.name]: doc,
            },
        });
    });
