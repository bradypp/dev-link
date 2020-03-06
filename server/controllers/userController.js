const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

exports.getCurrentUser = (req, res) => {
    if (!req.user) {
        return res.status(400).json({ user: 'User not found' });
    }

    res.json(req.user);
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.user;
        // Remove user posts
        await Post.deleteMany({ user: id });
        // Remove profile
        await Profile.findOneAndRemove({ user: id });
        // Remove user
        await User.findOneAndRemove({ _id: id });

        res.json({ success: true, msg: 'User deleted' });
    } catch (err) {
        res.status(404).json(err);
    }
};
