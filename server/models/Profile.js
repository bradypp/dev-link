const { Schema, model } = require('mongoose');

// TODO: make repos model and save featured repos into it with link to user/profile & populate on get
// TODO: mongoose validators
// TODO: edit default image sizes & optimize them
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    avatar: {
        medium: {
            type: String,
            default: 'default-medium.jpg',
        },
        small: {
            type: String,
            default: 'default-small.jpg',
        },
        thumbnail: {
            type: String,
            default: 'default-thumbnail.jpg',
        },
    },
    cover_image: {
        large: {
            type: String,
            default: 'default-large.jpg',
        },
        medium: {
            type: String,
            default: 'default-medium.jpg',
        },
        small: {
            type: String,
            default: 'default-small.jpg',
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
            lowercase: true,
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
            lowercase: true,
        },
    ],
    role_types: [
        {
            type: String,
            trim: true,
            enum: [
                'full-time permanent',
                'full-time temporary',
                'part-time permanent',
                'part-time temporary',
                'open source',
                'freelance',
                'intern',
            ],
            lowercase: true,
        },
    ],
    availability: {
        type: String,
        trim: true,
        enum: [
            'unavailable',
            'immediately',
            'less than 1 week',
            'less than 2 weeks',
            'less than 3 weeks',
            'less than 4 weeks',
            'more than 4 weeks',
        ],
        lowercase: true,
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
            images: [
                {
                    large: {
                        type: String,
                    },
                    medium: {
                        type: String,
                    },
                    small: {
                        type: String,
                    },
                    thumbnail: {
                        type: String,
                    },
                },
            ],
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
    number_of_stars: Number,
    number_of_watching: Number,
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// TODO: update indexes
// Indexes allow for more efficient queries
profileSchema.index({ user: 1 });
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
