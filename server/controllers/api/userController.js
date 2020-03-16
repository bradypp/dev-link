const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getCurrentUser = (req, res, next) => {
    res.json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
};

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
