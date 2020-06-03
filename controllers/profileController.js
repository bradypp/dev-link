const handlers = require('./handlers');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { AppError, catchAsync, multerUpload } = require('../utils');

const notFoundErrorMessage = 'Profile not found';

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

exports.uploadProfileImages = multerUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 },
    { name: 'portfolio_images', maxCount: 6 },
]);

exports.prepareProfileImages = catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    if (req.files.avatar) req.body.avatar = req.files.avatar[0].location;
    if (req.files.cover_image) req.body.cover_image = req.files.cover_image[0].location;
    if (req.files.portfolio_images)
        req.body.portfolio_images = req.files.portfolio_images.map(el => el.location);
    next();
});

exports.addPortfolioItem = catchAsync(async (req, res, next) => {
    const { title, description, skills, repo, demo } = req.body;

    const profile = await Profile.findOneAndUpdate(
        { user: req.params.userId },
        {
            $push: {
                portfolio: {
                    title,
                    description,
                    skills,
                    repo,
                    demo,
                    images: req.body.portfolio_images || [],
                },
            },
        },
    );

    if (!profile) {
        return next(new AppError(notFoundErrorMessage, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            profile,
            item_id: profile.portfolio[profile.portfolio.length - 1].id,
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

    profile.total_stars = profile.stars ? profile.stars.length : 0;

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

    profile.total_watchers = profile.watchers ? profile.watchers.length : 0;

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
