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
        validation.createUpdateProfile,
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.deleteReplacedProfileImages,
        profileController.createUpdateProfile,
    )
    .delete(
        profileController.getMe,
        profileController.deleteAllProfileImages,
        profileController.deleteProfile,
    );

// TODO: delete?
// router
//     .route('/experience')
//     .post(validation.experience, profileController.getMe, profileController.addExperience);

// // TODO: delete?
// // TODO: make an update route?
// router
//     .route('/experience/:expId')
//     .delete(profileController.getMe, profileController.removeExperience);

// // TODO: delete?
// router
//     .route('/education')
//     .post(validation.education, profileController.getMe, profileController.addEducation);

// // TODO: delete?
// // TODO: make an update route?
// router
//     .route('/education/:eduId')
//     .delete(profileController.getMe, profileController.removeEducation);

router
    .route('/portfolio')
    .post(
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.addPortfolioItem,
    );

router
    .route('/portfolio/:portId')
    .put(
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.updatePortfolioItem,
    )
    .delete(profileController.getMe, profileController.removePortfolioItem);

router.route('/:id/star').patch(profileController.getMe, profileController.toggleStar);

router.route('/:id/watch').patch(profileController.getMe, profileController.toggleWatch);

// Restrict the following routes to admin users only
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .post(profileController.createProfileAdmin)
    .patch(profileController.updateProfileAdmin)
    .delete(profileController.deleteProfile);

module.exports = router;
