const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');
const handlers = require('./handlers');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { AppError, catchAsync, multerImageUpload } = require('../utils');

// TODO: move education & experience validation (from/to fields) to the front end and allow in create/update profile by sending the whole experience/education array, remove from fields to omit
// TODO: allow updating likes in update profile route? push user id to likes array then send to update endpoint
// TODO: add routes to update/delete single or multiple profile images

exports.getMe = (req, res, next) => {
    req.params.userId = req.user.id;
    next();
};

exports.getByUsername = catchAsync(async (req, res, next) => {
    if (!req.query.username) next();
    const user = await User.findOne({ username: req.query.username });
    req.params.userId = user.id;
    next();
});

const notFoundErrorMessage = 'Profile not found';

exports.createProfileAdmin = handlers.createOne(Profile);
exports.updateProfileAdmin = handlers.updateOneByUserId(Profile);

exports.getProfile = handlers.getOneByUserId(Profile, { errorMessage: notFoundErrorMessage });
exports.deleteProfile = handlers.deleteOneByUserId(Profile, { errorMessage: notFoundErrorMessage });
exports.getAllProfiles = handlers.getAll(Profile);

exports.createUpdateProfile = catchAsync(async (req, res, next) => {
    // Exclude fields that shouldn't be saved in this route
    if (req.body.portfolio) delete req.body.portfolio;

    // Profile fields to save to new profile
    const profileFields = {
        ...req.body,
        user: req.params.userId,
    };

    const profile = await Profile.findOneAndUpdate({ user: req.params.userId }, profileFields, {
        new: true,
        runValidators: true,
        upsert: true,
    });

    if (!profile) {
        return next(new AppError('Unable to update/create profile', 400));
    }

    // Add reference to profile to user document
    req.user.profile = profile.id;
    req.user.save();

    res.status(201).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.uploadProfileImages = multerImageUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 },
]);

// TODO: delete profile avatar on uploading a new one (do this before image upload?). Make this a more general avatar preparation middleware?
exports.resizeProfileImages = catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    // Profile avatar
    if (req.files.avatar) {
        req.body.avatar = `profile-avatar-${req.user.id}-${Date.now()}.jpeg`;
        await sharp(req.files.avatar[0].buffer)
            .resize(400, 400)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/profile/avatar/${req.body.avatar}`);
    }

    // Cover image
    if (req.files.cover_image) {
        req.body.cover_image = `profile-cover_image-${req.user.id}-${Date.now()}.jpeg`;
        await sharp(req.files.cover_image[0].buffer)
            .resize(1188, 297)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/profile/cover_image/${req.body.cover_image}`);
    }

    next();
});

// TODO: create delete single image route/middleware for when an image is removed from a profile
exports.deleteProfileImages = catchAsync(async (req, res, next) => {
    const profile = Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    if (profile.avatar && profile.avatar !== 'default.jpg') {
        fs.unlink(`public/img/profile/avatar/${profile.avatar}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    if (profile.cover_image && profile.cover_image !== 'default.jpg') {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    // TODO: test
    if (profile.portfolio && profile.portfolio.length > 0) {
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
// TODO: create utility image handlers for deletion, updating, resizing etc then create the needed middlewares
exports.uploadProfilePortfolioImages = multerImageUpload.array('images', 5);

exports.resizeProfilePortfolioImages = catchAsync(async (req, res, next) => {
    if (req.files) {
        req.body.images = [];

        await Promise.all(
            req.files.map(async (file, i) => {
                const filename = `profile-portfolio-${i + 1}-${req.user.id}-${Date.now()}.jpeg`;

                await sharp(file.buffer)
                    .resize(500, 500)
                    .toFormat('jpeg')
                    .jpeg({ quality: 80 })
                    .toFile(`public/img/profile/portfolio/${filename}`);

                req.body.images.push(filename);
            }),
        );
    }
    next();
});

// TODO: test portfolio updating using update/create route with images
exports.addPortfolioItem = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    // Make new education object and add to profile
    profile.portfolio.push(req.body);

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

// TODO: create separate route for updating portfolio images
exports.editPortfolioItem = catchAsync(async (req, res, next) => {
    if (req.body.images) {
        return next(
            new AppError('This is the incorrect route for editing profile portfolio images', 400),
        );
    }

    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    // Get item index and overwrite old data with new data
    const itemIndex = profile.portfolio.map(item => item.id).indexOf(req.params.portId);
    // eslint-disable-next-line no-underscore-dangle
    profile.portfolio.splice(itemIndex, 1, { ...profile.portfolio[itemIndex]._doc, ...req.body });

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

exports.toggleStar = catchAsync(async (req, res, next) => {
    const profile = await Profile.findById(req.params.id);
    const user = await User.findById(req.params.userId);

    const userIsInProfileStarsArr = profile.stars.includes(req.params.userId);
    const profileIsInUserStarredArr = user.starred.includes(req.params.id);

    // Check if the profile has already been starred by the current user
    if (userIsInProfileStarsArr && profileIsInUserStarredArr) {
        // Remove user from the stars array if user already exists
        const profileLikesRemoveIndex = profile.stars
            .map(el => el.toString())
            .indexOf(req.params.userId);
        profile.stars.splice(profileLikesRemoveIndex, 1);

        // Remove profile from the stars array if user already exists
        const userLikesRemoveIndex = user.starred.map(el => el.toString()).indexOf(req.params.id);
        user.starred.splice(userLikesRemoveIndex, 1);
    } else {
        // Add user to the profile stars array
        profile.stars.push(req.params.userId);
        // Add profile to the user starred array
        user.starred.push(req.params.id);
    }

    await profile.save();
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
            user,
        },
    });
});

exports.toggleWatch = catchAsync(async (req, res, next) => {
    const profile = await Profile.findById(req.params.id);
    const user = await User.findById(req.params.userId);

    const userIsInProfileWatchersArr = profile.watchers.includes(req.params.userId);
    const profileIsInUserWatchingArr = user.watching.includes(req.params.id);

    // Check if the profile has already been liked by the current user
    if (userIsInProfileWatchersArr && profileIsInUserWatchingArr) {
        // Remove user from the watchers array if user already exists
        const profileWatchersRemoveIndex = profile.watchers
            .map(el => el.toString())
            .indexOf(req.params.userId);
        profile.watchers.splice(profileWatchersRemoveIndex, 1);

        // Remove profile from the watching array if user already exists
        const userWatchingRemoveIndex = user.watching
            .map(el => el.toString())
            .indexOf(req.params.id);
        user.watching.splice(userWatchingRemoveIndex, 1);
    } else {
        // Add user to the profile watchers array
        profile.watchers.push(req.params.userId);
        // Add profile to the users watching array
        user.watching.push(req.params.id);
    }

    await profile.save();
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
            user,
        },
    });
});

// TODO: delete?
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
