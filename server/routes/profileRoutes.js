const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const validation = require('../controllers/validation');

// mergeParams allows access to other/nested router params
const router = express.Router({ mergeParams: true });

// Public routes
router.route('/').get(profileController.getProfile);
router.route('/all').get(profileController.getAllProfiles);
router.route('/githubRepos/:githubUsername').get(profileController.getGithubRepos);

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
router
    .route('/experience')
    .put(validation.experience, profileController.getMe, profileController.addExperience);
router
    .route('/experience/:expId')
    .delete(profileController.getMe, profileController.removeExperience);
router
    .route('/education')
    .put(validation.education, profileController.getMe, profileController.addEducation);
router
    .route('/education/:eduId')
    .delete(profileController.getMe, profileController.removeEducation);

// Restrict the following routes to admin users only
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .post(profileController.createProfile)
    .patch(profileController.updateProfile)
    .delete(profileController.deleteProfile);

module.exports = router;
