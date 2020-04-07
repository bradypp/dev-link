const { Schema, model } = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const options = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
};

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your full name'],
            trim: true,
        },
        username: {
            type: String,
            required: [true, 'Please enter a username'],
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
            min: [8, 'Password must contain at least 8 characters'],
            validate: {
                validator(value) {
                    return value.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,}$/g);
                },
                message: 'Password must contain a mix of letters, numbers and symbols',
            },
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Profile',
                unique: true,
            },
        ],
        watching: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Profile',
                unique: true,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    options,
);

// Indexes allow for more efficient queries
userSchema.index({ name: 1, username: 1, email: 1 });

// A virtual is a property that isn't stored in the database
userSchema.virtual('first_name').get(function() {
    return this.name.split(' ')[0];
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

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
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

const User = model('User', userSchema, 'users');

module.exports = User;
