const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');
const factory = require('./handlerFactory');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { AppError, catchAsync, multerImageUpload } = require('../utils');

// TODO: move education & experience validation (from/to fields) to the front end and allow in create/update profile by sending the whole experience/education array, remove from fields to omit
// TODO: allow updating likes in update profile route? push user id to likes array then send to update endpoint

exports.getMe = (req, res, next) => {
    req.params.userId = req.user.id;
    next();
};

const notFoundErrorMessage = 'Profile not found';

exports.getProfile = factory.getOneByUserId(Profile, { errorMessage: notFoundErrorMessage });
exports.updateProfile = factory.updateOneByUserId(Profile, {
    errorMessage: notFoundErrorMessage,
    fieldsToOmit: ['interests', 'portfolio', 'experience', 'education', 'likes'],
});
exports.deleteProfile = factory.deleteOneByUserId(Profile, { errorMessage: notFoundErrorMessage });
exports.getAllProfiles = factory.getAll(Profile);

exports.createProfile = catchAsync(async (req, res, next) => {
    // Check a profile doesn't already exist for this user
    if (await Profile.findOne({ user: req.params.userId })) {
        return next(new AppError('Profile for this user already exists', 400));
    }

    // Profile fields to save to new profile
    const profileFields = {
        ...req.body,
        user: req.params.userId,
        interests: undefined,
        portfolio: undefined,
        experience: undefined,
        education: undefined,
        likes: undefined,
    };

    // Create and save new profile
    const profile = await Profile.create(profileFields);

    // Add reference to profile to user document
    const user = await User.findById(req.params.userId);
    user.profile = profile.id;
    user.save();

    res.status(201).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.uploadProfileImages = multerImageUpload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 },
]);

// TODO: delete profile photo on uploading a new one (do this before image upload?). Make this a more general photo preparation middleware?
exports.resizeProfileImages = catchAsync(async (req, res, next) => {
    if (!req.files.photo || !req.files.cover_image) return next();

    // Profile photo
    req.body.photo = `profile-${req.user.id}-${Date.now()}-photo.jpeg`;
    await sharp(req.file.buffer)
        .resize(400, 400)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/profile/photo/${req.body.photo}`);

    // Cover image
    req.body.cover_image = `profile-${req.user.id}-${Date.now()}-cover_image.jpeg`;
    await sharp(req.file.buffer)
        .resize(1188, 297)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/profile/cover/${req.body.cover_image}`);

    next();
});

exports.deleteProfileImages = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }
    if (profile.photo === 'default.jpeg') next();

    if (profile.photo) {
        fs.unlink(`public/img/profile/photo/${profile.photo}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    // TODO: test
    if (profile.portfolio.length > 0) {
        profile.portfolio.images.forEach(image =>
            fs.unlink(`public/img/profile/portfolio/${image}`, err => {
                if (err) next(new AppError(err.message, 500));
            }),
        );
    }

    next();
});

exports.addExperience = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
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
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
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
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
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
        return next(new AppError(notFoundErrorMessage, 404));
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

// TODO: test images upload
// TODO: delete images on updating/deleting old items/images. Make this a more general portfolio image preparation middleware?
exports.uploadProfilePortfolioImages = multerImageUpload.array('images', 5);

exports.resizeProfilePortfolioImages = catchAsync(async (req, res, next) => {
    if (!req.files.images) return next();

    req.body.images = [];

    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `portfolio-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;

            await sharp(req.file.buffer)
                .resize(500, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toFile(`public/img/profile/portfolio/${filename}`);

            req.body.images.push(filename);
        }),
    );
    next();
});

// TODO: test portfolio updating using update/create route with images
exports.addPortfolioItem = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    // Make new education object and add to profile
    const newPortfolioItem = { ...req.body };
    profile.portfolio.push(newPortfolioItem);

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

// TODO: test
exports.removePortfolioItem = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    // Get remove index and splice from education array
    const removeIndex = profile.portfolio.map(item => item.id).indexOf(req.params.portId);
    profile.portfolio.splice(removeIndex, 1);

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.toggleLike = catchAsync(async (req, res, next) => {
    const profile = await Profile.findById(req.params.id);
    const user = await User.findById(req.params.userId);

    const isInProfileLikesArr =
        profile.likes.filter(el => el.toString() === req.params.userId).length > 0;
    const idInUserLikesArr = user.likes.filter(el => el.toString() === req.params.id).length > 0;

    if (isInProfileLikesArr !== idInUserLikesArr) {
        return next(new AppError('User likes array and profile likes array are out of sync', 400));
    }

    // Check if the profile has already been liked by the current user
    if (isInProfileLikesArr && idInUserLikesArr) {
        // Remove user from the likes array if user already exists
        const profileLikesRemoveIndex = profile.likes
            .map(el => el.toString())
            .indexOf(req.params.userId);
        profile.likes.splice(profileLikesRemoveIndex, 1);

        // Remove profile from the likes array if user already exists
        const userLikesRemoveIndex = user.likes.map(el => el.toString()).indexOf(req.params.id);
        user.likes.splice(userLikesRemoveIndex, 1);
    } else {
        // Add user to the profile likes array
        profile.likes.push(req.params.userId);
        // Add profile to the user likes array
        user.likes.push(req.params.id);
    }

    await profile.save();
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.toggleWatching = catchAsync(async (req, res, next) => {
    // if (req.params.id === req.user.);
    const profile = await Profile.findById(req.params.id);
    const user = await User.findById(req.params.userId);

    const isInProfileWatchingArr =
        profile.watching.filter(el => el.toString() === req.params.userId).length > 0;
    const idInUserWatchingArr =
        user.watching.filter(el => el.toString() === req.params.id).length > 0;

    if (isInProfileWatchingArr !== idInUserWatchingArr) {
        return next(
            new AppError('User watching array and profile watching array are out of sync', 400),
        );
    }

    // Check if the profile has already been liked by the current user
    if (isInProfileWatchingArr && idInUserWatchingArr) {
        // Remove user from the likes array if user already exists
        const profileWatchingRemoveIndex = profile.watching
            .map(el => el.toString())
            .indexOf(req.params.userId);
        profile.watching.splice(profileWatchingRemoveIndex, 1);

        // Remove profile from the likes array if user already exists
        const userWatchingRemoveIndex = user.watching
            .map(el => el.toString())
            .indexOf(req.params.id);
        user.watching.splice(userWatchingRemoveIndex, 1);
    } else {
        // Add user to the profile likes array
        profile.watching.push(req.params.userId);
        // Add profile to the profile likes array
        user.watching.push(req.params.id);
    }

    await profile.save();
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.getGithubRepos = catchAsync(async (req, res, next) => {
    const githubRes = await axios.get(
        `https://api.github.com/users/${req.params.github_username}/repos?per_page=10&sort=created:asc`,
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
