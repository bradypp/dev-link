const sharp = require('sharp');
const axios = require('axios');
const factory = require('./handlerFactory');
const Profile = require('../models/Profile');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multerUpload = require('../utils/multerUpload');

exports.getMe = (req, res, next) => {
    req.params.userId = req.user.id;
    next();
};

exports.getProfile = factory.getOneByUserId(Profile);
exports.updateProfile = factory.updateOneByUserId(Profile);
exports.deleteProfile = factory.deleteOneByUserId(Profile);
exports.getAllProfiles = factory.getAll(Profile);

exports.createProfile = catchAsync(async (req, res, next) => {
    // Check a profile doesn't already exist for this user
    let profile = await Profile.findOne({
        user: req.params.userId,
    });

    if (profile) {
        return next(new AppError('Profile for this user already exists', 400));
    }

    const profileFields = {
        ...req.body,
        user: req.params.userId,
    };

    // Create and save new profile
    profile = new Profile(profileFields);
    await profile.save();

    res.status(201).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.uploadProfilePhoto = multerUpload.single('photo');

exports.resizeProfilePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);

    next();
});

exports.addExperience = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Make new experience object and add to profile
    const newExp = { ...req.body };
    profile.experience.push(newExp);

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.removeExperience = catchAsync(async (req, res, next) => {
    // Find profile
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Get remove index and splice from experience array
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expId);
    profile.experience.splice(removeIndex, 1);

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.addEducation = catchAsync(async (req, res, next) => {
    // Find profile
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Make new education object and add to profile
    const newEdu = { ...req.body };
    profile.education.push(newEdu);

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.removeEducation = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Get remove index and splice from education array
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.eduId);
    profile.education.splice(removeIndex, 1);

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.getGithubRepos = catchAsync(async (req, res, next) => {
    const githubRes = await axios.get(
        `https://api.github.com/users/${req.params.githubUsername}/repos?per_page=10&sort=created:asc`,
        {
            headers: {
                'user-agent': 'node.js',
                Accept: 'application/vnd.github.v3+json',
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
            },
        },
    );

    res.status(200).json({
        status: 'success',
        data: {
            repos: githubRes.data,
        },
    });
});
