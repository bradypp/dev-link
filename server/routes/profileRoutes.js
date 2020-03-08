const router = require('express').Router();
const { privateRoute } = require('../controllers/authController');
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
} = require('../controllers/profileController');
const {
    validate,
    profileValidationRules,
    experienceValidationRules,
    educationValidationRules,
} = require('../validation');

// Public routes
router.route('/all').get(getAllUserProfiles);
router.route('/user/:user_id').get(getProfileByUserId);
router.route('/github/:github_username').get(getUserGithubRepos);

// Private routes
router
    .route('/')
    .get(privateRoute, getCurrentUserProfile)
    .post(privateRoute, profileValidationRules(), validate, createOrUpdateUserProfile);
router
    .route('/experience')
    .put(privateRoute, experienceValidationRules(), validate, addExperienceToProfile);
router.route('/experience/:exp_id').delete(privateRoute, removeExperienceFromProfile);
router
    .route('/education')
    .put(privateRoute, educationValidationRules(), validate, addEducationToProfile);
router.route('/education/:edu_id').delete(privateRoute, removeEducationFromProfile);

module.exports = router;
