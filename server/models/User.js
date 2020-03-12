const { Schema, model } = require('mongoose');

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
    },
    avatar: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // False to remove from all queries:
        select: false,
    },
});

const User = model('User', userSchema, 'users');

module.exports = User;
