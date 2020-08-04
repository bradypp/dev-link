const express = require('express');
const authController = require('../authController');
const profileController = require('../profileController');
const validation = require('../validation');

// mergeParams allows access to other/nested router params
const router = express.Router({ mergeParams: true });

// Public routes
router.route('/').get(profileController.getByUsername, profileController.getProfile);
router.route('/all').get(profileController.getAllProfiles);

// All routes after this middleware are protected
router.use(authController.protect);

router
    .route('/me')
    .get(profileController.getMe, profileController.getProfile)
    .post(
        authController.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.createProfile,
    )
    .patch(
        authController.restrictTo('admin', 'user'),
        validation.updateProfile,
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.updateProfile,
    )
    .delete(
        authController.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.deleteProfile,
    );

router
    .route('/portfolio')
    .post(
        authController.restrictTo('admin', 'user'),
        validation.updatePortfolio,
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.addPortfolioItem,
    );

router
    .route('/portfolio/:portId')
    .patch(
        authController.restrictTo('admin', 'user'),
        validation.updatePortfolio,
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.updatePortfolioItem,
    )
    .delete(
        authController.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.removePortfolioItem,
    );

router
    .route('/:id/star')
    .patch(
        authController.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.toggleStar,
    );
router
    .route('/:id/watch')
    .patch(
        authController.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.toggleWatch,
    );

// Restrict the following routes to admin users only
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .post(profileController.createProfileAdmin)
    .patch(profileController.updateProfile)
    .delete(profileController.deleteProfile);

module.exports = router;
