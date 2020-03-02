const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = User;
