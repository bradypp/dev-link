const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    avatar: String,
    cover_image: {
        large: {
            type: String,
            default: 'default-large.jpeg',
        },
        medium: {
            type: String,
            default: 'default-medium.jpeg',
        },
        small: {
            type: String,
            default: 'default-small.jpeg',
        },
    },
    name: {
        type: String,
        trim: true,
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
    contact: [
        {
            name: {
                type: String,
                trim: true,
            },
            value: {
                type: String,
                trim: true,
            },
        },
    ],
    skills: [
        {
            type: String,
            trim: true,
        },
    ],
    bio: {
        type: String,
        trim: true,
    },
    desired_roles: [
        {
            type: String,
            trim: true,
        },
    ],
    role_types: [
        {
            type: String,
            trim: true,
            enum: [
                'Full-time permanent',
                'Full-time temporary',
                'Part-time permanent',
                'Part-time temporary',
                'Open source',
                'Freelance',
                'Intern',
            ],
        },
    ],
    availability: {
        type: String,
        trim: true,
        enum: [
            'Immediately',
            'Less than 1 week',
            '1 - 2 weeks',
            '2 - 3 weeks',
            '3 - 4 weeks',
            'More than 4 weeks',
            'Unavailable',
        ],
    },
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
            school: {
                type: String,
                required: true,
                trim: true,
            },
            school_type: {
                type: String,
                trim: true,
            },
            qualification_type: {
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
    certifications: [
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },
            issuer: {
                type: String,
                trim: true,
            },
            date: {
                type: Date,
                trim: true,
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
            value: {
                type: String,
                trim: true,
            },
        },
    ],
    stars: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    watchers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    total_stars: Number,
    total_watchers: Number,
    active: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

// Indexes allow for more efficient queries
profileSchema.index({ user: 1 });

profileSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email username',
    });
    next();
});

const Profile = model('Profile', profileSchema, 'profiles');

module.exports = Profile;
