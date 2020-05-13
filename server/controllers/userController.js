const User = require('../models/User');
const Profile = require('../models/Profile');
const handlers = require('./handlers');
const { AppError, catchAsync } = require('../utils');

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
    const { name, email, username, password, password2, active } = req.body;
    const user = await User.findById(req.params.id);

    // Create error if user sends password data
    if (password || password2) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /auth/update-password.',
                400,
            ),
        );
    }

    if (name && name !== user.name) user.name = name;

    if (username && username !== user.username) {
        if (await User.findOne({ username })) {
            return next(new AppError('This username is already taken!', 400));
        }
        user.username = username;
    }

    if (email && email !== user.email) {
        if (await User.findOne({ email })) {
            return next(new AppError('This email is already taken!', 400));
        }
        user.email = email;
    }

    if ('active' in req.body) {
        await Profile.findByIdAndUpdate(user.profile, { active });
        user.active = active;
    }

    user.save();

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
