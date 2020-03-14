const Post = require('../../models/Post');
const User = require('../../models/User');

exports.getAllPosts = async (req, res) => {
    try {
        // Find all posts and sort by date
        const posts = await Post.find().sort('-createdAt');

        if (!posts) {
            return res.status(404).json({ posts: 'No posts found' });
        }

        res.json(posts);
    } catch (err) {
        if (err.king === 'ObjectId') {
            return res.status(404).json({ posts: 'No posts found' });
        }
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ post: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ post: 'Post not found' });
        }
        res.status(500).send({ msg: 'Server Error' });
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
        const post = await new Post({ text, name, avatar, user: id }).save();

        res.json(post);
    } catch (err) {
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.deletePostById = async (req, res) => {
    try {
        // Get and check post exists
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ post: 'Post not found' });
        }

        // Check user is authorized
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Remove post
        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ post: 'Post not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.addPostLike = async (req, res) => {
    try {
        // Get and check post exists
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ post: 'Post not found' });
        }

        // Check if post is already liked by user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'User has already liked this post' });
        }

        // Add user id to likes array and save
        post.likes.unshift({ user: req.user.id });
        await post.save();

        res.json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ post: 'Post not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.removePostLike = async (req, res) => {
    try {
        // Get and check post exists
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ post: 'Post not found' });
        }

        // Check if post is liked by user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'User has not yet liked this post' });
        }

        // Get like to remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        // Remove like from post likes array
        post.likes.splice(removeIndex, 1);
        await post.save();

        res.json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ post: 'Post not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.addPostComment = async (req, res) => {
    try {
        // Get user and post
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        // Create comment
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };

        // Add comment to comments array
        post.comments.unshift(newComment);
        await post.save();

        res.json(post.comments);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ post: 'Post not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.removePostComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // Check comment exists
        if (!comment) {
            return res.status(404).json({ comment: 'Comment does not exist' });
        }

        // Check user is authorized
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get comment index
        const commentIndex = post.comments
            .map(comment => comment.id.toString())
            .indexOf(req.params.comment_id);

        // Remove comment from post comments array
        post.comments.splice(commentIndex, 1);
        await post.save();

        res.json(post.comments);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ post: 'Post not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};
