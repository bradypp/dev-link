const gravatar = require('gravatar');
const { promisify } = require('util');
const normalize = require('normalize-url');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/User');

exports.createUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if a user with that email exists
    let user = await User.findOne({ email });

    if (user) {
        return next(new AppError('User with this email already exists', 400));
    }

    // Get gravatar for that email & set a default
    const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default
    });

    // Create new user
    user = new User({
        name,
        email,
        avatar: normalize(avatar),
        password,
    });

    user.password = await User.encryptPassword(password);
    await user.save();

    // Create and send JWT
    user.createSendJwt(res);
});

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    const isPasswordValid = await user.checkPassword(password);

    if (!user || !isPasswordValid) {
        return next(new AppError('Email or password incorrect', 400));
    }

    // Create and send JWT
    user.createSendJwt(res);
});

exports.protected = catchAsync(async (req, res, next) => {
    // Get token from header or cookies
    let token;
    if (req.header('Authorization')) {
        token = req.header('Authorization');
    }

    // TODO: Add cookie options?
    // else if (req.cookies.jwt) {
    //     token = req.cookies.jwt;
    // }

    // Check if token exists
    if (!token) {
        return next(new AppError('No token, authorization denied', 401));
    }
    // Remove bearer from token if it exists
    if (token.startsWith('Bearer') || token.startsWith('Token')) {
        token = req.header('Authorization').split(' ')[1];
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Get user and check if user still exists
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    // Check if user has changed password since token was issued
    if (user.changedPasswordSinceJWT(decoded.iat)) {
        return next(new AppError('User recently changed password! Please login again.', 401));
    }

    req.user = user;
    next();
});
