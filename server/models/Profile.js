const { Schema, model } = require('mongoose');

// TODO: make repos model and save featured repos into it with link to user/profile & populate on get

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    avatar: {
        type: String,
        default: 'default.jpg',
    },
    cover_image: {
        type: String,
        default: 'default.jpg',
    },
    headline: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    current_position: {
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
    contact: {
        email: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
    },
    bio: {
        type: String,
        trim: true,
    },
    skills: [
        {
            type: String,
            trim: true,
        },
    ],
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
                // required: [true, 'Title is required'],
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
                    'freelance',
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
    socials: [
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
    stars: [
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
profileSchema.index({
    user: 1,
    city: 1,
    country: 1,
});
profileSchema.index({ languages: 1 });
profileSchema.index({ skills: 1 });

profileSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email',
    });
    next();
});

const Profile = model('Profile', profileSchema, 'profiles');

module.exports = Profile;
