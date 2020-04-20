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
    { name: 'portfolio_images', maxCount: 5 },
]);

exports.prepareProfileImages = catchAsync(async (req, res, next) => {
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

    if (req.files.portfolio_images) {
        req.body.portfolio_images = [];
        // Create an array of promises to name/resize the images then fulfill them all at once using Promise.all
        await Promise.all(
            req.files.portfolio_images.map(async (file, i) => {
                const filename = `profile-portfolio-${i + 1}-${req.user.id}-${Date.now()}.jpeg`;

                await sharp(file.buffer)
                    .resize(1536, 864)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/img/profile/portfolio/${filename}`);

                req.body.portfolio_images.push(filename);
            }),
        );
    }

    next();
});

// TODO: test
exports.deleteReplacedProfileImages = catchAsync(async (req, res, next) => {
    if (!req.body.avatar && !req.body.cover_image) return next();

    // Check for existing images that are being replaced and delete them
    const profile = await Profile.findOne({ user: req.params.userId });

    // If there's no profile, continue to the next stage (it might be a new profile)
    if (!profile) return next();

    if (req.body.avatar && profile.avatar !== 'default.jpg' && profile.avatar !== req.body.avatar) {
        fs.unlink(`public/img/profile/avatar/${profile.avatar}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    if (
        req.body.cover_image &&
        profile.cover_image !== 'default.jpg' &&
        profile.cover_image !== req.body.cover_image
    ) {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    next();
});

exports.deleteAllProfileImages = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    if (profile.avatar !== 'default.jpg') {
        fs.unlink(`public/img/profile/avatar/${profile.avatar}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    if (profile.cover_image !== 'default.jpg') {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    if (profile.portfolio.length > 0) {
        profile.portfolio.forEach(item => {
            item.images.forEach(image =>
                fs.unlink(`public/img/profile/portfolio/${image}`, err => {
                    if (err) next(new AppError(err.message, 500));
                }),
            );
        });
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
    if (removeIndex === -1) {
        return next(new AppError('Experience item not found or updated', 404));
    }

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
    if (removeIndex === -1) {
        return next(new AppError('Education item not found or updated', 404));
    }

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

// add uploaded images when creating a new item
// add new images to the existing array
// delete old images and upload new images when updating item
// delete old images when deleting item

exports.preparePortfolioItemImages = catchAsync(async (req, res, next) => {
    if (!req.files.portfolio_images) return next();

    req.body.portfolio_images = [];

    // Create an array of promises to name/resize the images then fulfill them all at once using Promise.all
    // Add the new images to req.body.portfolio_images
    await Promise.all(
        req.files.portfolio_images.map(async (file, i) => {
            const filename = `profile-portfolio-${i + 1}-${req.user.id}-${Date.now()}.jpeg`;

            await sharp(file.buffer)
                .resize(500, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toFile(`public/img/profile/portfolio/${filename}`);

            req.body.portfolio_images.push(filename);
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
    profile.portfolio.push({ ...req.body, images: req.body.portfolio_images || [] });

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

// If an image is uploaded, send it along with the whole portfolio item with field-name 'portfolio_images'
exports.updatePortfolioItem = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    // Get portfolio item
    const itemIndex = profile.portfolio.map(item => item.id).indexOf(req.params.portId);

    if (itemIndex === -1) {
        return next(new AppError('Portfolio item not found', 404));
    }

    const portfolioItem = profile.portfolio[itemIndex];

    // Delete old images if some item images are removed from the images array
    if (req.body.images) {
        const imagesToDelete = portfolioItem.images.filter(
            image => !req.body.images.includes(image),
        );
        if (imagesToDelete.length > 0) {
            imagesToDelete.forEach(image =>
                fs.unlink(`public/img/profile/portfolio/${image}`, err => {
                    if (err) next(new AppError(err.message, 500));
                }),
            );
        }
    }

    const uploadedImages = req.body.portfolio_images || [];
    const currentImages = req.body.images || portfolioItem.images;
    const imagesToSave = [...currentImages, ...uploadedImages];
    console.log(req.body);
    // Update the portfolio item
    const { _id, title, description, skills, repo, demo } = portfolioItem;
    profile.portfolio[itemIndex] = {
        _id,
        title,
        description,
        skills,
        repo,
        demo,
        ...req.body,
        images: imagesToSave,
    };

    // Save profile and send response
    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

exports.removePortfolioItem = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    // Get remove index and splice from education array
    const removeIndex = profile.portfolio.map(item => item.id).indexOf(req.params.portId);
    if (removeIndex === -1) {
        return next(new AppError('Portfolio item not found', 404));
    }

    // Delete portfolio item images
    profile.portfolio[removeIndex].images.forEach(image =>
        fs.unlink(`public/img/profile/portfolio/${image}`, err => {
            if (err) next(new AppError(err.message, 500));
        }),
    );

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
