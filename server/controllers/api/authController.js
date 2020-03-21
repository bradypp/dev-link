const gravatar = require('gravatar');
const { promisify } = require('util');
const normalize = require('normalize-url');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/User');

exports.signUp = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if a user with that email exists
    let user = await User.findOne({
        email,
    });

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

    await user.save();

    // Create and send JWT
    user.createSendJwt(res, 201);
});

exports.signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const validationError = new AppError('Email or password incorrect', 400);

    // Check user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(validationError);
    }

    // Check password is valid
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
        return next(validationError);
    }

    // Create and send JWT
    user.createSendJwt(res);
});

exports.protected = catchAsync(async (req, res, next) => {
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
        return next(new AppError('You are not logged in! Please log in to gain access.', 401));
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

    // TODO: change message to be more user friendly
    const message = `Forgot your password? Submit a PATCH request with a new password and password2 to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message,
        });

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

    // Need to use user.save to make sure the pre-save middleware for encryption runs
    await user.save();

    // Create and send JWT
    user.createSendJwt(res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const { current_password, password } = req.body;

    // Get user
    const user = await User.findById(req.user.id).select('+password');

    // Check if current password is correct
    if (!(await user.checkPassword(current_password))) {
        return next(new AppError('Current password incorrect', 401));
    }

    // Update password
    user.password = password;

    // Need to use user.save to make sure the pre-save middleware for encryption runs
    await user.save();

    // Create and send JWT
    user.createSendJwt(res);
});
