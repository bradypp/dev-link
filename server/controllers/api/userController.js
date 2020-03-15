const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const catchAsync = require('../../utils/catchAsync');

exports.getCurrentUser = (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({ user: 'User not found' });
    }

    res.json(req.user);
};

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    await Post.deleteMany({ user: id });
    await Profile.findOneAndRemove({ user: id });
    await User.findOneAndRemove({ _id: id });

    res.json({ success: true, msg: 'User deleted' });
});
