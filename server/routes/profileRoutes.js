const router = require('express').Router();
const { protectedRoute } = require('../controllers/authController');
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

// Protected routes
router
    .route('/')
    .get(protectedRoute, getCurrentUserProfile)
    .post(protectedRoute, profileValidationRules(), validate, createOrUpdateUserProfile);
router
    .route('/experience')
    .put(protectedRoute, experienceValidationRules(), validate, addExperienceToProfile);
router.route('/experience/:exp_id').delete(protectedRoute, removeExperienceFromProfile);
router
    .route('/education')
    .put(protectedRoute, educationValidationRules(), validate, addEducationToProfile);
router.route('/education/:edu_id').delete(protectedRoute, removeEducationFromProfile);

module.exports = router;
