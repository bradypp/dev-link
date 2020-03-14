const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    company: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    github_username: {
        type: String,
        trim: true,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },
            company: {
                type: String,
                required: true,
                trim: true,
            },
            location: {
                type: String,
                trim: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
                trim: true,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
                trim: true,
            },
            degree: {
                type: String,
                required: true,
                trim: true,
            },
            field_of_study: {
                type: String,
                required: true,
                trim: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
                trim: true,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
            trim: true,
        },
        twitter: {
            type: String,
            trim: true,
        },
        facebook: {
            type: String,
            trim: true,
        },
        linkedin: {
            trim: true,
            type: String,
        },
        instagram: {
            type: String,
            trim: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model('Profile', profileSchema, 'profiles');
