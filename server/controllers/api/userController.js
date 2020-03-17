const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getCurrentUser = (req, res, next) => {
    res.json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
};

exports.updateMe = catchAsync(async (req, res, next) => {
    const { password, password2 } = req.body;

    // Create error if user POSTs password data
    if (password || password2) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /auth/update-password.',
                400,
            ),
        );
    }

    // Filter req.body to only update name & email
    const filteredBody = filterObj(req.body, 'name', 'email');

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    await Post.deleteMany({ user: id });
    await Profile.findOneAndRemove({ user: id });
    await User.findOneAndRemove({ _id: id });

    res.json({
        status: 'success',
        message: 'User deleted',
    });
});
