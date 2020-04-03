const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    photo: {
        type: String,
        default: 'default.jpg',
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
        required: [true, 'Status is required'],
        trim: true,
    },
    skills: {
        type: [String],
        required: [true, 'Skills are required'],
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    githubUsername: {
        type: String,
        trim: true,
    },
    experience: [
        {
            title: {
                type: String,
                required: [true, 'Title is required'],
                trim: true,
            },
            company: {
                type: String,
                required: [true, 'Company is required'],
                trim: true,
            },
            location: {
                type: String,
                trim: true,
            },
            from: {
                type: Date,
                required: [true, 'From date is required'],
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
                required: [true, 'From date is required'],
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
    socials: {
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
    likes: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User' },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// Indexes allow for more efficient queries
profileSchema.index({ user: 1, status: 1, location: 1, skills: 1 });

profileSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email avatar',
    });
    next();
});

const Profile = model('Profile', profileSchema, 'profiles');

module.exports = Profile;
