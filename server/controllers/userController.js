const User = require('../models/User');
const handlers = require('./handlers');
const { AppError, catchAsync, filterObject } = require('../utils');

exports.getUser = handlers.getOneById(User);
exports.createUserAdmin = handlers.createOne(User);
exports.updateUserAdmin = handlers.updateOneById(User);
exports.deleteUser = handlers.deleteOneById(User);

exports.getIdFromCurrentUser = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

// Allows updating of name, email & active status
exports.updateUser = catchAsync(async (req, res, next) => {
    // Create error if user sends password data
    if (req.body.password || req.body.password2) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /auth/update-password.',
                400,
            ),
        );
    }

    if (req.body.email) {
        if (await User.findOne({ email: req.body.email })) {
            return next(new AppError('This email is already taken!', 400));
        }
    }

    if (req.body.username) {
        if (await User.findOne({ username: req.body.username })) {
            return next(new AppError('This username is already taken!', 400));
        }
    }

    const filteredBody = filterObject(req.body, ['name', 'username', 'email', 'active']);

    const user = await User.findByIdAndUpdate(req.params.userId, filteredBody, { new: true });

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.getWatching = catchAsync(async (req, res, next) => {
    const { watching } = await User.findById(req.params.id).populate('watching');

    res.status(200).json({
        status: 'success',
        data: {
            watching,
        },
    });
});

exports.getLikes = catchAsync(async (req, res, next) => {
    const { likes } = await User.findById(req.params.id).populate('likes');

    res.status(200).json({
        status: 'success',
        data: {
            likes,
        },
    });
});
