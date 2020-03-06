const Profile = require('../models/User');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = async (req, res) => {
    try {
        // Find all posts and sort by date
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.json(post);
    } catch (err) {
        res.status(404).json({ posts: 'No posts found' });
    }
};

exports.createNewPost = async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.user;

        // Get user
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(400).json({ user: 'User not found' });
        }

        const { name, avatar } = user;

        // Create and save new post
        const savedPost = await new Post({ text, name, avatar, user: id }).save();

        res.json(savedPost);
    } catch (err) {
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.addPostLike = async (req, res) => {
    try {
        // Check profile and post exists
        await Profile.findOne({ user: req.user.id });
        const post = await Post.findById(req.params.id);

        // Check if post is already liked by user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ already_liked: 'User has already liked this post' });
        }

        // Add user id to likes array and save
        post.likes.unshift({ user: req.user.id });
        const savedPost = await post.save();

        res.json(savedPost);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.removePostLike = async (req, res) => {
    try {
        // Check profile and post exists
        await Profile.findOne({ user: req.user.id });
        const post = await Post.findById(req.params.id);

        // Check if post is liked by user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ not_liked: 'User has not yet liked this post' });
        }

        // Get like to remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        // Remove like from post likes array
        post.likes.splice(removeIndex, 1);
        const savedPost = await post.save();

        res.json(savedPost);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.addPostComment = async (req, res) => {
    try {
        const { text, name, avatar } = req.body;
        const post = await Post.findById(req.params.id);
        const newComment = {
            text,
            name,
            avatar,
            user: req.user.id,
        };

        // Add comment to comments array
        post.comments.unshift(newComment);
        const savedPost = await post.save();

        res.json(savedPost);
    } catch (err) {
        res.status(404).json({ post_not_found: 'No post found' });
    }
};

exports.removePostComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check comment exists
        if (
            post.comments.filter(comment => comment.id.toString() === req.params.comment_id)
                .length === 0
        ) {
            return res.status(404).json({ comment_not_found: 'Comment does not exist' });
        }

        // Get comment to remove index
        const removeIndex = post.comments
            .map(comment => comment.id.toString())
            .indexOf(req.params.comment_id);

        // Remove comment from post comments array
        post.comments.splice(removeIndex, 1);
        const savedPost = await post.save();

        res.json(savedPost);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.deletePostById = async (req, res) => {
    try {
        // Check profile and post exists
        await Profile.findOne({ user: req.user.id });
        const post = await Post.findById(req.params.id);

        // Check for post owner
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ not_authorized: 'User not authorized' });
        }

        // Remove post
        await post.remove();

        res.json({ success: true });
    } catch (err) {
        res.status(404).json({ post_not_found: 'No post found' });
    }
};
