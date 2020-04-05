const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const validation = require('../controllers/validation');

// mergeParams allows access to other/nested router params
const router = express.Router({ mergeParams: true });

// Public routes
router.route('/').get(profileController.getProfile);
router.route('/all').get(profileController.getAllProfiles);
router.route('/githubRepos/:github_username').get(profileController.getGithubRepos);

// All routes after this middleware are protected
router.use(authController.protect);

router
    .route('/me')
    .get(profileController.getMe, profileController.getProfile)
    .post(
        validation.createProfile,
        profileController.getMe,
        profileController.uploadProfilePhoto,
        profileController.resizeProfilePhoto,
        profileController.createProfile,
    )
    .patch(
        validation.updateProfile,
        profileController.getMe,
        profileController.uploadProfilePhoto,
        profileController.resizeProfilePhoto,
        profileController.updateProfile,
    )
    .delete(profileController.getMe, profileController.deleteProfile);

// TODO: add required routes (portfolio etc.)
// route: /v1/api/profile/experience
router
    .route('/experience')
    .patch(validation.experience, profileController.getMe, profileController.addExperience);

// route: /v1/api/profile/experience/:expId
router
    .route('/experience/:expId')
    .delete(profileController.getMe, profileController.removeExperience);

// route: /v1/api/profile/education/:expId
router
    .route('/education')
    .patch(validation.education, profileController.getMe, profileController.addEducation);

// route: /v1/api/profile/education/:eduId
router
    .route('/education/:eduId')
    .delete(profileController.getMe, profileController.removeEducation);

// route: v/1/api/profile/:id/like
router.route('/:id/like').patch(profileController.getMe, profileController.toggleLike);

// route: v/1/api/profile/:id/watch
router.route('/:id/watch').patch(profileController.getMe, profileController.toggleWatching);

// Restrict the following routes to admin users only
router.use(authController.restrictTo('admin'));

// route: /v1/api/user/:userId/profile/
router
    .route('/')
    .post(profileController.createProfile)
    .patch(profileController.updateProfile)
    .delete(profileController.deleteProfile);

module.exports = router;
