const sharp = require('sharp');
const fs = require('fs');
const handlers = require('./handlers');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { AppError, catchAsync, multerImageUpload } = require('../utils');

const notFoundErrorMessage = 'Profile not found';
const logErrorToConsole = err => {
    if (process.env.NODE_ENV === 'development') console.error(err);
};

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

exports.createProfileAdmin = handlers.createOne(Profile);
exports.updateProfile = handlers.updateOneByUserId(Profile);
exports.getProfile = handlers.getOneByUserId(Profile, { errorMessage: notFoundErrorMessage });
exports.deleteProfile = handlers.deleteOneByUserId(Profile, { errorMessage: notFoundErrorMessage });
exports.getAllProfiles = handlers.getAll(Profile);
exports.deleteProfile = handlers.deleteOneByUserId(Profile, { errorMessage: notFoundErrorMessage });

exports.createProfile = catchAsync(async (req, res, next) => {
    if (await Profile.findOne({ user: req.params.userId })) {
        return next(new AppError('Profile already exists for this user', 400));
    }

    const profile = await Profile.create({
        ...req.body,
        user: req.params.userId,
    });

    if (!profile) {
        return next(new AppError('Unable to create profile', 400));
    }

    // Add profile reference to user
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
    { name: 'portfolio_images', maxCount: 6 },
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
            .jpeg({ quality: 90 })
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
            .jpeg({ quality: 90 })
            .toFile(`public/img/profile/cover_image/${cover_image.medium}`);

        cover_image.small = `${filename}-small.jpeg`;
        await sharp(req.files.cover_image[0].buffer)
            .resize(451, 113)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
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
                    .resize(1152, 777)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/img/profile/portfolio/${image.large}`);

                image.medium = `${filename}-medium.jpeg`;
                await sharp(file.buffer)
                    .resize(768, 518)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/img/profile/portfolio/${image.medium}`);

                image.small = `${filename}-small.jpeg`;
                await sharp(file.buffer)
                    .resize(480, 324)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/img/profile/portfolio/${image.small}`);

                image.thumbnail = `${filename}-thumbnail.jpeg`;
                await sharp(file.buffer)
                    .resize(200, 200)
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
        if (
            req.body.avatar.medium !== profile.avatar.medium &&
            profile.avatar.medium !== 'default-medium.jpg'
        ) {
            fs.unlink(`public/img/profile/avatar/${profile.avatar.medium}`, logErrorToConsole);
        }
        if (
            req.body.avatar.small !== profile.avatar.small &&
            profile.avatar.small !== 'default-small.jpg'
        ) {
            fs.unlink(`public/img/profile/avatar/${profile.avatar.small}`, logErrorToConsole);
        }
        if (
            req.body.avatar.thumbnail !== profile.avatar.thumbnail &&
            profile.avatar.thumbnail !== 'default-thumbnail.jpg'
        ) {
            fs.unlink(`public/img/profile/avatar/${profile.avatar.thumbnail}`, logErrorToConsole);
        }
    }

    if (req.body.cover_image) {
        if (
            req.body.cover_image.large !== profile.cover_image.large &&
            profile.cover_image.large !== 'default-large.jpg'
        ) {
            fs.unlink(
                `public/img/profile/cover_image/${profile.cover_image.large}`,
                logErrorToConsole,
            );
        }
        if (
            req.body.cover_image.medium !== profile.cover_image.medium &&
            profile.cover_image.medium !== 'default-medium.jpg'
        ) {
            fs.unlink(
                `public/img/profile/cover_image/${profile.cover_image.medium}`,
                logErrorToConsole,
            );
        }
        if (
            req.body.cover_image.small !== profile.cover_image.small &&
            profile.cover_image.small !== 'default-small.jpg'
        ) {
            fs.unlink(
                `public/img/profile/cover_image/${profile.cover_image.small}`,
                logErrorToConsole,
            );
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
        fs.unlink(`public/img/profile/avatar/${profile.avatar.medium}`, logErrorToConsole);
    }
    if (profile.avatar.small !== 'default-small.jpg') {
        fs.unlink(`public/img/profile/avatar/${profile.avatar.small}`, logErrorToConsole);
    }
    if (profile.avatar.thumbnail !== 'default-thumbnail.jpg') {
        fs.unlink(`public/img/profile/avatar/${profile.avatar.thumbnail}`, logErrorToConsole);
    }
    if (profile.cover_image.large !== 'default-large.jpg') {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image.large}`, logErrorToConsole);
    }
    if (profile.cover_image.medium !== 'default-medium.jpg') {
        fs.unlink(
            `public/img/profile/cover_image/${profile.cover_image.medium}`,
            logErrorToConsole,
        );
    }
    if (profile.cover_image.small !== 'default-small.jpg') {
        fs.unlink(`public/img/profile/cover_image/${profile.cover_image.small}`, logErrorToConsole);
    }

    if (profile.portfolio.length > 0) {
        profile.portfolio.forEach(item => {
            item.images.forEach(imageObj => {
                fs.unlink(`public/img/profile/portfolio/${imageObj.large}`, logErrorToConsole);
                fs.unlink(`public/img/profile/portfolio/${imageObj.medium}`, logErrorToConsole);
                fs.unlink(`public/img/profile/portfolio/${imageObj.small}`, logErrorToConsole);
                fs.unlink(`public/img/profile/portfolio/${imageObj.thumbnail}`, logErrorToConsole);
            });
        });
    }

    next();
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
                fs.unlink(`public/img/profile/portfolio/${image.large}`, logErrorToConsole);
                fs.unlink(`public/img/profile/portfolio/${image.medium}`, logErrorToConsole);
                fs.unlink(`public/img/profile/portfolio/${image.small}`, logErrorToConsole);
                fs.unlink(`public/img/profile/portfolio/${image.thumbnail}`, logErrorToConsole);
            });
        }
    }

    // Create the new images array after uploads and deletions
    const uploadedImages = req.body.portfolio_images || [];
    const currentImages = req.body.images || profile.portfolio[itemIndex].images;
    const savedImages = [...currentImages, ...uploadedImages];

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
        fs.unlink(`public/img/profile/portfolio/${imageObj.large}`, logErrorToConsole);
        fs.unlink(`public/img/profile/portfolio/${imageObj.medium}`, logErrorToConsole);
        fs.unlink(`public/img/profile/portfolio/${imageObj.small}`, logErrorToConsole);
        fs.unlink(`public/img/profile/portfolio/${imageObj.thumbnail}`, logErrorToConsole);
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

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }
    if (!user) {
        return next(new AppError('User not found', 404));
    }

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

    profile.number_of_stars = profile.stars.length || 0;

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

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }
    if (!user) {
        return next(new AppError('User not found', 404));
    }

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

    profile.number_of_watching = profile.watching.length || 0;

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
