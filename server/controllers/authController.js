const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { AppError, catchAsync, Email } = require('../utils');
const User = require('../models/User');

const createSendJwt = (res, user, statusCode = 200) => {
    const payload = { id: user.id };

    const jwtExpiryMilliseconds = process.env.JWT_EXPIRES_MINUTES * 60 * 1000;

    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: jwtExpiryMilliseconds,
    });

    const cookieOptions = {
        expires: new Date(Date.now() + jwtExpiryMilliseconds),
        httpOnly: true,
        sameSite: 'strict',
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Send token & user data in response
    res.status(statusCode).json({
        status: 'success',
        data: {
            token,
        },
    });
};

exports.signUp = catchAsync(async (req, res, next) => {
    // Check if a user with that email exists
    if (await User.findOne({ email: req.body.email })) {
        return next(new AppError('User with this email already exists', 400));
    }

    // Check if a user with that username exists
    if (await User.findOne({ username: req.body.username })) {
        return next(new AppError('User with this username already exists', 400));
    }

    // Create new user
    const user = await User.create(req.body);

    // Create and send JWT
    createSendJwt(res, user, 201);
});

exports.signIn = catchAsync(async (req, res, next) => {
    const user = req.body.email
        ? await User.findOne({ email: req.body.email }).select('+password')
        : await User.findOne({ username: req.body.username }).select('+password');

    // Check user exists and password is valid
    if (!user || !(await user.checkPassword(req.body.password))) {
        return next(new AppError('Sign in details incorrect', 400));
    }

    // Create and send JWT
    createSendJwt(res, user);
});

exports.signOut = (req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        sameSite: 'strict',
    };

    // Remove jwt cookie
    res.cookie('jwt', 'loggedout', cookieOptions);

    res.status(200).json({
        status: 'success',
    });
};

exports.protect = catchAsync(async (req, res, next) => {
    // Get token from header or cookies
    let token;

    if (req.header('Authorization') && req.header('Authorization').startsWith('Bearer')) {
        // Remove bearer from token
        token = req.header('Authorization').split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    // Check if token exists
    if (!token) {
        return next(new AppError('You are not signed in! Please sign in to gain access.', 401));
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Get user and check if user still exists
    const user = await User.findById(decoded.id).select('-createdAt -passwordChangedAt');

    if (!user) {
        return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    // Check if user has changed password since token was issued
    if (user.changedPasswordSinceJWT(decoded.iat)) {
        return next(new AppError('User recently changed password! Please sign again.', 401));
    }

    req.user = user;
    next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // Get user based on email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }
    // Generate the random reset token
    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    // Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
        'host',
    )}/api/v1/auth/reset-password/${resetToken}`;

    try {
        await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Please try again later!'),
            500,
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // Encrypt reset token to compare with the one in the database
    const hashedToken = User.encryptPasswordResetToken(req.params.token);

    // Get user based on the token
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now(),
        },
    });

    // Check user and token is valid
    if (!user) {
        return next(new AppError('Reset token is invalid or has expired', 400));
    }

    // Set the new password
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Need to use user.save not user.findByIdAndUpdate to make sure the pre-save middleware for encryption runs
    await user.save();

    // Create and send JWT
    createSendJwt(res, user);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check if current password is correct
    if (!(await user.checkPassword(req.body.current_password))) {
        return next(new AppError('Current password incorrect', 401));
    }

    // Update password
    user.password = req.body.password;

    // Need to use user.save not user.findByIdAndUpdate to make sure the pre-save middleware for encryption runs
    await user.save();

    // Create and send JWT
    createSendJwt(res, user);
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }

        next();
    };
};
