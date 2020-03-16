const gravatar = require('gravatar');
const { promisify } = require('util');
const normalize = require('normalize-url');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/User');

const createSendJwt = (user, statusCode, res) => {
    // Create payload
    const payload = { id: user.id };

    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // TODO: Add cookie options?
    // const cookieOptions = {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    // };
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // res.cookie('jwt', token, cookieOptions);

    // Send token & user data in response
    res.status(statusCode).json({
        status: 'success',
        data: {
            token,
        },
    });
};

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

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Return JWT
    createSendJwt(user, 200, res);
});

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new AppError('Email or password incorrect', 400));
    }

    // Check password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError('Email or password incorrect', 400));
    }

    // User matched - create and send JWT
    createSendJwt(user, 200, res);
});

exports.protected = catchAsync(async (req, res, next) => {
    // Get token from header or cookies
    let token;
    if (req.header('x-auth-token')) {
        token = req.header('x-auth-token');
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
        token = req.header('x-auth-token').split(' ')[1];
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Get user and check if user still exists
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    req.user = user;
    next();
});
