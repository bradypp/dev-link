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
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
};

exports.updateUser = catchAsync(async (req, res, next) => {
    const { password, password2, email } = req.body;

    // Create error if user sends password data
    if (password || password2) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /auth/update-password.',
                400,
            ),
        );
    }

    if (email) {
        // Check user with this email doesn't exist
        if (await User.findOne({ email })) {
            return next(new AppError('This email is already taken!', 400));
        }
    }

    const filteredBody = filterObj(req.body, 'name', 'email', 'active');
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true });

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    await Post.deleteMany({ user: id });
    await Profile.findOneAndRemove({ user: id });
    await User.findOneAndRemove({ _id: id });

    res.status(200).json({
        status: 'success',
        message: 'User deleted',
    });
});
