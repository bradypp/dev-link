const sharp = require('sharp');
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
        const avatar = {};
        const filename = `profile-avatar-${req.user.id}-${Date.now()}`;

        avatar.medium = `${filename}-medium.jpeg`;
        await sharp(req.files.avatar[0].buffer)
            .resize(400, 400)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/profile/avatar/${avatar.medium}`);

        avatar.small = `${filename}-small.jpeg`;
        await sharp(req.files.avatar[0].buffer)
            .resize(200, 200)
            .toFormat('jpeg')
            .jpeg({ quality: 85 })
            .toFile(`public/img/profile/avatar/${avatar.small}`);

        avatar.thumbnail = `${filename}-thumbnail.jpeg`;
        await sharp(req.files.avatar[0].buffer)
            .resize(50, 50)
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(`public/img/profile/avatar/${avatar.thumbnail}`);

        req.body.avatar = avatar;
    }

    // Cover image
    if (req.files.cover_image) {
        const cover_image = {};
        const filename = `profile-cover_image-${req.user.id}-${Date.now()}`;

        cover_image.large = `${filename}-large.jpeg`;
        await sharp(req.files.cover_image[0].buffer)
            .resize(1010, 253)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/profile/cover_image/${cover_image.large}`);

        cover_image.medium = `${filename}-medium.jpeg`;
        await sharp(req.files.cover_image[0].buffer)
            .resize(713, 178)
            .toFormat('jpeg')
            .jpeg({ quality: 85 })
            .toFile(`public/img/profile/cover_image/${cover_image.medium}`);

        cover_image.small = `${filename}-small.jpeg`;
        await sharp(req.files.cover_image[0].buffer)
            .resize(451, 113)
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(`public/img/profile/cover_image/${cover_image.small}`);

        req.body.cover_image = cover_image;
    }

    // Portfolio item images
    if (req.files.portfolio_images) {
        const portfolio_images = [];

        // Create an array of promises to name/resize the images then fulfill them all at once using Promise.all
        await Promise.all(
            req.files.portfolio_images.map(async (file, i) => {
                const image = {};
                const filename = `profile-portfolio-${i + 1}-${req.user.id}-${Date.now()}`;

                image.large = `${filename}-large.jpeg`;
                await sharp(file.buffer)
                    .resize(1152, 648)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/img/profile/portfolio/${image.large}`);

                image.medium = `${filename}-medium.jpeg`;
                await sharp(file.buffer)
                    .resize(768, 432)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/img/profile/portfolio/${image.medium}`);

                image.small = `${filename}-small.jpeg`;
                await sharp(file.buffer)
                    .resize(480, 270)
                    .toFormat('jpeg')
                    .jpeg({ quality: 80 })
                    .toFile(`public/img/profile/portfolio/${image.small}`);

                image.thumbnail = `${filename}-thumbnail.jpeg`;
                await sharp(file.buffer)
                    .resize(192, 108)
                    .toFormat('jpeg')
                    .jpeg({ quality: 80 })
                    .toFile(`public/img/profile/portfolio/${image.thumbnail}`);

                portfolio_images.push(image);
            }),
        );

        req.body.portfolio_images = portfolio_images;
    }

    next();
});

exports.deleteReplacedProfileImages = catchAsync(async (req, res, next) => {
    if (!req.body.avatar && !req.body.cover_image) return next();

    // Check for existing images that are being replaced and delete them
    const profile = await Profile.findOne({ user: req.params.userId });

    // If there's no profile, continue to the next stage (it might be a new profile)
    if (!profile) return next();

    if (req.body.avatar) {
        if (profile.avatar.medium !== 'default-medium.jpg') {
            fs.unlink(`public/img/profile/avatar/${profile.avatar.medium}`, err => {
                if (err) next(new AppError(err.message, 500));
            });
        }
        if (profile.avatar.small !== 'default-small.jpg') {
            fs.unlink(`public/img/profile/avatar/${profile.avatar.small}`, err => {
                if (err) next(new AppError(err.message, 500));
            });
        }
        if (profile.avatar.thumbnail !== 'default-thumbnail.jpg') {
            fs.unlink(`public/img/profile/avatar/${profile.avatar.thumbnail}`, err => {
                if (err) next(new AppError(err.message, 500));
            });
        }
    }

    if (req.body.cover_image) {
        if (profile.cover_image.large !== 'default-large.jpg') {
            fs.unlink(`public/img/profile/cover_image/${profile.cover_image.large}`, err => {
                if (err) next(new AppError(err.message, 500));
            });
        }
        if (profile.cover_image.medium !== 'default-medium.jpg') {
            fs.unlink(`public/img/profile/cover_image/${profile.cover_image.medium}`, err => {
                if (err) next(new AppError(err.message, 500));
            });
        }
        if (profile.cover_image.small !== 'default-small.jpg') {
            fs.unlink(`public/img/profile/cover_image/${profile.cover_image.small}`, err => {
                if (err) next(new AppError(err.message, 500));
            });
        }
    }

    next();
});

exports.deleteAllProfileImages = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    if (profile.avatar.medium !== 'default-medium.jpg') {
        fs.unlink(`public/img/profile/avatar/${profile.avatar.medium}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }
    if (profile.avatar.small !== 'default-small.jpg') {
        fs.unlink(`public/img/profile/avatar/${profile.avatar.small}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }
    if (profile.avatar.thumbnail !== 'default-thumbnail.jpg') {
        fs.unlink(`public/img/profile/avatar/${profile.avatar.thumbnail}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }
    if (profile.cover_image.large !== 'default-large.jpg') {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image.large}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }
    if (profile.cover_image.medium !== 'default-medium.jpg') {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image.medium}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }
    if (profile.cover_image.small !== 'default-small.jpg') {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image.small}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    }

    if (profile.portfolio.length > 0) {
        profile.portfolio.forEach(item => {
            item.images.forEach(imageObj => {
                fs.unlink(`public/img/profile/portfolio/${imageObj.large}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
                fs.unlink(`public/img/profile/portfolio/${imageObj.medium}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
                fs.unlink(`public/img/profile/portfolio/${imageObj.small}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
                fs.unlink(`public/img/profile/portfolio/${imageObj.thumbnail}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
            });
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

exports.addPortfolioItem = catchAsync(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    const images = req.body.portfolio_images || [];

    profile.portfolio.push({
        ...req.body,
        images,
    });

    await profile.save();

    res.status(200).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

// TODO: add validation to only allow 5 images
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

    // Check if the images array is different and delete any deleted images
    if (req.body.images) {
        // eslint-disable-next-line no-underscore-dangle
        const bodyImageIds = req.body.images.map(image => image._id);
        const currentImageIds = profile.portfolio[itemIndex].images.map(image =>
            image.id.toString(),
        );
        const idsOfImagesToRemove = currentImageIds.filter(id => !bodyImageIds.includes(id));

        if (idsOfImagesToRemove.length > 0) {
            idsOfImagesToRemove.forEach(id => {
                const image = profile.portfolio[itemIndex].images.find(el => el.id === id);
                fs.unlink(`public/img/profile/portfolio/${image.large}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
                fs.unlink(`public/img/profile/portfolio/${image.medium}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
                fs.unlink(`public/img/profile/portfolio/${image.small}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
                fs.unlink(`public/img/profile/portfolio/${image.thumbnail}`, err => {
                    if (err) next(new AppError(err.message, 500));
                });
            });
        }
    }

    // Create the new images array after uploads and deletions
    const uploadedImages = req.body.portfolio_images || [];
    const currentImages = req.body.images || profile.portfolio[itemIndex].images;
    const savedImages = [...currentImages, ...uploadedImages];
    console.log(savedImages);

    // Update the portfolio item
    const { _id, title, description, skills, repo, demo } = profile.portfolio[itemIndex];
    profile.portfolio[itemIndex] = {
        _id,
        title,
        description,
        skills,
        repo,
        demo,
        ...req.body,
        images: savedImages,
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
    profile.portfolio[removeIndex].images.forEach(imageObj => {
        fs.unlink(`public/img/profile/portfolio/${imageObj.large}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
        fs.unlink(`public/img/profile/portfolio/${imageObj.medium}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
        fs.unlink(`public/img/profile/portfolio/${imageObj.small}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
        fs.unlink(`public/img/profile/portfolio/${imageObj.thumbnail}`, err => {
            if (err) next(new AppError(err.message, 500));
        });
    });

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
