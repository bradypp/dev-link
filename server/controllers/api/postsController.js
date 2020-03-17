const Post = require('../../models/Post');
const User = require('../../models/User');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAllPosts = catchAsync(async (req, res, next) => {
    // Find all posts and sort by date
    const posts = await Post.find().sort('-createdAt');
    res.json({
        status: 'success',
        data: {
            posts,
        },
    });
});

exports.getPostById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
        return next(new AppError('Post not found', 404));
    }

    res.json({
        status: 'success',
        data: {
            post,
        },
    });
});

exports.createNewPost = catchAsync(async (req, res, next) => {
    const { text } = req.body;
    const { id } = req.user;

    // Get user
    const user = await User.findById(id).select('-password');

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const { name, avatar } = user;

    // Create and save new post
    const post = await new Post({ text, name, avatar, user: id }).save();

    res.json({
        status: 'success',
        data: {
            post,
        },
    });
});

exports.deletePostById = catchAsync(async (req, res, next) => {
    // Get and check post exists
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new AppError('Post not found', 404));
    }

    // Check user is authorized
    if (post.user.toString() !== req.user.id) {
        return next(new AppError('User not authorized', 401));
    }

    // Remove post
    await post.remove();
    res.json({
        status: 'success',
        message: 'Post removed',
    });
});

exports.addPostLike = catchAsync(async (req, res, next) => {
    // Get and check post exists
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new AppError('Post not found', 404));
    }

    // Check if post is already liked by user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return next(new AppError('User has already liked this post', 400));
    }

    // Add user id to likes array and save
    post.likes.push({ user: req.user.id });
    await post.save();

    res.json({
        status: 'success',
        data: {
            post,
        },
    });
});

exports.removePostLike = catchAsync(async (req, res, next) => {
    // Get and check post exists
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new AppError('Post not found', 404));
    }

    // Check if post is liked by user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return next(new AppError('User has not yet liked this post', 400));
    }

    // Get like to remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    // Remove like from post likes array
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json({
        status: 'success',
        data: {
            post,
        },
    });
});

exports.addPostComment = catchAsync(async (req, res, next) => {
    // Get user and post
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new AppError('Post not found', 404));
    }

    // Create comment
    const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
    };

    // Add comment to comments array
    post.comments.push(newComment);
    await post.save();

    res.json({
        status: 'success',
        data: {
            comments: post.comments,
        },
    });
});

exports.removePostComment = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new AppError('Post not found', 404));
    }

    // Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    // Check comment exists
    if (!comment) {
        return next(new AppError('Comment does not exist', 404));
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

    res.json({
        status: 'success',
        data: {
            comments: post.comments,
        },
    });
});
