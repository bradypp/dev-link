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
const validation = require('../controllers/api/validation');
const { PROFILE, EXPERIENCE, EDUCATION } = require('../controllers/api/validation/validationTypes');

// Public routes
router.route('/all').get(getAllUserProfiles);
router.route('/user/:user_id').get(getProfileByUserId);
router.route('/github/:github_username').get(getUserGithubRepos);

// Private routes
router
    .route('/')
    .get(privateRoute, getCurrentUserProfile)
    .post(privateRoute, validation(PROFILE), createOrUpdateUserProfile);
router.route('/experience').put(privateRoute, validation(EXPERIENCE), addExperienceToProfile);
router.route('/experience/:exp_id').delete(privateRoute, removeExperienceFromProfile);
router.route('/education').put(privateRoute, validation(EDUCATION), addEducationToProfile);
router.route('/education/:edu_id').delete(privateRoute, removeEducationFromProfile);

module.exports = router;
