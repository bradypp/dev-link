const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const deleteOne = async (
    req,
    res,
    next,
    Model,
    conditions,
    errorMessage = 'No document found with that ID',
) => {
    const doc = await Model.findOneAndRemove(conditions);
    if (!doc) {
        return next(new AppError(errorMessage, 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

exports.deleteOneById = (Model, errorMessage) =>
    catchAsync(async (req, res, next) => {
        deleteOne(req, res, next, Model, { _id: req.params.id }, errorMessage);
    });

exports.deleteOneByUserId = (Model, errorMessage) =>
    catchAsync(async (req, res, next) => {
        deleteOne(req, res, next, Model, { user: req.params.userId }, errorMessage);
    });
