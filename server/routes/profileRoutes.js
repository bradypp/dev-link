const router = require('express').Router();
const { privateRoute } = require('../controllers/api/authController');
const {
    getCurrentUserProfile,
    createOrUpdateUserProfile,
    getAllUserProfiles,
    getProfileByUserId,
    addExperienceToProfile,
    removeExperienceFromProfile,
    addEducationToProfile,
    removeEducationFromProfile,
    getUserGithubRepos,
} = require('../controllers/api/profileController');
const {
    profileValidation,
    experienceValidation,
    educationValidation,
} = require('./validation/profileValidation');

// Public routes
router.route('/all').get(getAllUserProfiles);
router.route('/user/:user_id').get(getProfileByUserId);
router.route('/github/:github_username').get(getUserGithubRepos);

// Private routes
router
    .route('/')
    .get(privateRoute, getCurrentUserProfile)
    .post(privateRoute, profileValidation(), createOrUpdateUserProfile);
router.route('/experience').put(privateRoute, experienceValidation(), addExperienceToProfile);
router.route('/experience/:exp_id').delete(privateRoute, removeExperienceFromProfile);
router.route('/education').put(privateRoute, educationValidation(), addEducationToProfile);
router.route('/education/:edu_id').delete(privateRoute, removeEducationFromProfile);

module.exports = router;
