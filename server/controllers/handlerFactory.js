const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const QueryParamsHandler = require('./queryParamsHandler');

const getId = (req, idLocation) =>
    (idLocation === 'req.params' && req.params.id) || (idLocation === 'req.user' && req.user.id);

// TODO: fix defaults for params (ie. if null, set default e.g. lookupKey = lookupKey || '_id';)
// TODO: make the other factory functions reusable like this one allowing for multiple lookup keys
// TODO: test each as you go

exports.deleteOne = (Model, lookupKey = '_id', idLocation = 'req.params') =>
    catchAsync(async (req, res, next) => {
        const id = getId(req, idLocation);

        await Model.findOneAndRemove({ [lookupKey]: id });
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });

// Don't update user passwords using this (User.save() needs to be used for the update password middlewares to run)
exports.updateOneById = (
    Model,
    newData = null,
    responseDataKey = 'data',
    idLocation = 'req.params',
    moreQueryOptions = {},
    errorMessage = 'No document found with that ID',
) =>
    catchAsync(async (req, res, next) => {
        const id = getId(req, idLocation);
        const data = newData || req.body;

        const doc = await Model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
            ...moreQueryOptions,
        });

        if (!doc) {
            return next(new AppError(errorMessage, 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                [responseDataKey]: doc,
            },
        });
    });

exports.createOneById = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.getOneById = (
    Model,
    idLocation = 'req.params',
    errorMessage = 'No document found with that ID',
    popOptions = null,
) =>
    catchAsync(async (req, res, next) => {
        const id = getId(req, idLocation);
        let query = Model.findById(id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(new AppError(errorMessage, 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        const features = new QueryParamsHandler(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // const doc = await features.query.explain();
        const doc = await features.query;

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc,
            },
        });
    });
