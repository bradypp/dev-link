const catchAsync = require('../../utils/catchAsync');

const deleteOne = async (req, res, next, Model, conditions) => {
    await Model.findOneAndRemove(conditions);
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

exports.deleteOneByIdParams = Model =>
    catchAsync(async (req, res, next) => {
        deleteOne(req, res, next, Model, { _id: req.params.id });
    });

exports.deleteOneByIdCurrentUser = Model =>
    catchAsync(async (req, res, next) => {
        deleteOne(req, res, next, Model, { _id: req.user.id });
    });

exports.deleteOneByCurrentUser = Model =>
    catchAsync(async (req, res, next) => {
        deleteOne(Model, { user: req.user.id });
    });
