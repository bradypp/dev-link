const normalize = require('normalize-url');
const axios = require('axios');
const factory = require('./handlerFactory');
const Profile = require('../models/Profile');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getProfile = factory.getOneByUserParamsUserId(Profile);
exports.getCurrentUserProfile = factory.getOneByCurrentUser(Profile);
exports.getAllProfiles = factory.getAll(Profile);
exports.deleteProfile = factory.deleteOneByCurrentUser(Profile);

exports.createOrUpdateProfile = catchAsync(async (req, res, next) => {
    const {
        company,
        location,
        website,
        bio,
        skills,
        status,
        githubUsername,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
    } = req.body;

    // Set fields
    const profileFields = {
        user: req.user.id,
        company,
        location,
        bio,
        status,
        githubUsername,
        website: website ? normalize(website, { forceHttps: true }) : null,
        skills: skills ? skills.split(',').map(skill => skill.trim()) : null,
        social: {
            youtube: youtube ? normalize(youtube, { forceHttps: true }) : null,
            twitter: twitter ? normalize(twitter, { forceHttps: true }) : null,
            facebook: facebook ? normalize(facebook, { forceHttps: true }) : null,
            linkedin: linkedin ? normalize(linkedin, { forceHttps: true }) : null,
            instagram: instagram ? normalize(instagram, { forceHttps: true }) : null,
        },
    };

    // Find profile by user id and update if it exists, upsert:true allows a new profile to be created if one doesn't exist
    const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true },
    );

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.addExperience = catchAsync(async (req, res, next) => {
    const { title, company, location, from, to, current, description } = req.body;

    // Find profile
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Make new experience object
    const newExp = { title, company, location, from, to, current, description };

    // Add experience to profile
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
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expId);

    // Splice out of array
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
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Make new education object
    const newEdu = { ...req.body };

    // Add education to profile
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
    // Find profile
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
        return next(new AppError('Profile not found', 404));
    }

    // Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.eduId);

    // Splice out of array
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
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
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
