const { Schema, model } = require('mongoose');

// TODO: make repos model and save featured repos into it with link to user/profile & populate on get

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    cover_image: {
        type: String,
        default: 'default.jpg',
    },
    status: {
        type: String,
        trim: true,
    },
    seniority: {
        type: String,
        enum: ['Student', 'Junior', 'Experienced', 'Advanced'],
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    github_username: {
        type: String,
        trim: true,
    },
    skills: [
        {
            type: String,
            required: [true, 'Skills are required'],
            trim: true,
        },
    ],
    bio: {
        type: String,
        trim: true,
    },
    looking_for: {
        role_title: {
            type: String,
            trim: true,
        },
        types: [
            {
                type: String,
                trim: true,
            },
        ],
        description: {
            type: String,
            trim: true,
        },
        availability: {
            type: String,
            trim: true,
        },
    },
    interests: [
        {
            type: String,
            trim: true,
        },
    ],
    portfolio: [
        {
            title: {
                type: String,
                required: [true, 'Title is required'],
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            skills: [
                {
                    type: String,
                    trim: true,
                },
            ],
            repo: {
                type: String,
                trim: true,
            },
            demo: {
                type: String,
                trim: true,
            },
            images: [String],
        },
    ],
    experience: [
        {
            title: {
                type: String,
                required: [true, 'Title is required'],
                trim: true,
            },
            type: {
                type: String,
                required: [true, 'Type is required'],
                enum: [
                    'full-time permanent',
                    'full-time temporary',
                    'part-time permanent',
                    'part-time temporary',
                    'self-employed',
                ],
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
                trim: true,
            },
            to: {
                type: Date,
                trim: true,
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
            type: {
                type: String,
                required: [true, 'Education type is required'],
                trim: true,
            },
            school: {
                type: String,
                trim: true,
            },
            subjects: [
                {
                    title: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                    grade: {
                        type: String,
                        trim: true,
                    },
                },
            ],
            from: {
                type: Date,
                required: [true, 'From date is required'],
                trim: true,
            },
            to: {
                type: Date,
                trim: true,
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
        facebook: {
            type: String,
            trim: true,
        },
        linkedin: {
            trim: true,
            type: String,
        },
        twitter: {
            type: String,
            trim: true,
        },
        youtube: {
            type: String,
            trim: true,
        },
        instagram: {
            type: String,
            trim: true,
        },
        custom: [
            {
                name: {
                    type: String,
                    trim: true,
                },
                link: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
        },
    ],
    watchers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Indexes allow for more efficient queries
profileSchema.index({ user: 1, status: 1, location: 1, skills: 1 });

profileSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email',
    });
    next();
});

const Profile = model('Profile', profileSchema, 'profiles');

module.exports = Profile;
