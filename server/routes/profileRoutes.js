const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const validation = require('../controllers/validation');

// mergeParams allows access to other/nested router params
const router = express.Router({ mergeParams: true });

// Public routes
router.route('/').get(profileController.getProfile);
router.route('/all').get(profileController.getAllProfiles);
router.route('/github/:githubUsername').get(profileController.getGithubRepos);

// All routes after this middleware are protected
router.use(authController.protected);

router
    .route('/')
    .post(validation.profile, profileController.createOrUpdateProfile)
    .delete(profileController.deleteProfile);
router.route('/me').get(profileController.getCurrentUserProfile);
router.route('/experience').put(validation.experience, profileController.addExperience);
router.route('/experience/:expId').delete(profileController.removeExperience);
router.route('/education').put(validation.education, profileController.addEducation);
router.route('/education/:eduId').delete(profileController.removeEducation);

module.exports = router;
