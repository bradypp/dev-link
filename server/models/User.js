const { Schema, model } = require('mongoose');
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
        required: true,
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
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.methods.createSendJwt = function(res) {
    const payload = { id: this.id };

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
    res.json({
        status: 'success',
        data: {
            token,
        },
    });
};

userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
};

module.exports = model('User', userSchema, 'users');
