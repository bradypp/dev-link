const { Schema, model } = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// Encrypt password on registration and password update
userSchema.pre('save', async function(next) {
    // Only run this middleware if password was modified
    if (!this.isModified('password')) return next();

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.statics.encryptPasswordResetToken = function(token) {
    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
};

userSchema.methods.createSendJwt = function(res, statusCode = 200) {
    const payload = { id: this.id };

    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAYS,
    });

    // TODO: Add cookie options?
    // const cookieOptions = {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
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

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.this = function() {
    return this;
};

userSchema.methods.changedPasswordSinceJWT = function(JWTTimestamp) {
    let hasPasswordChanged = false;

    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        hasPasswordChanged = JWTTimestamp < changedTimestamp;
    }
    return hasPasswordChanged;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = this.constructor.encryptPasswordResetToken(resetToken);

    this.passwordResetExpires = Date.now() + process.env.PASSWORD_RESET_EXPIRY_MINUTES * 60 * 1000;

    return resetToken;
};

module.exports = model('User', userSchema, 'users');
