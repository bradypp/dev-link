const router = require('express').Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const validation = require('../validation');
const profileRules = require('../validation/profileRules');

// Public routes
router.route('/all').get(profileController.getAllUserProfiles);
router.route('/user/:user_id').get(profileController.getProfileByUserId);
router.route('/github/:github_username').get(profileController.getUserGithubRepos);

// All routes after this middleware are protected
router.use(authController.protected);

router
    .route('/')
    .get(profileController.getCurrentUserProfile)
    .post(validation(profileRules.profileRules), profileController.createOrUpdateUserProfile);
router
    .route('/experience')
    .put(validation(profileRules.experienceRules), profileController.addExperienceToProfile);
router.route('/experience/:exp_id').delete(profileController.removeExperienceFromProfile);
router
    .route('/education')
    .put(validation(profileRules.educationRules), profileController.addEducationToProfile);
router.route('/education/:edu_id').delete(profileController.removeEducationFromProfile);

module.exports = router;
