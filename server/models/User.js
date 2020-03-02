const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
        minlength: [2, 'The name must have at least 2 characters'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
