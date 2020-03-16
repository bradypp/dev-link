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

router.route('/all').get(getAllUserProfiles);
router.route('/user/:user_id').get(getProfileByUserId);
router.route('/github/:github_username').get(getUserGithubRepos);

// All routes after this middleware are private
router.use(privateRoute);

router
    .route('/')
    .get(getCurrentUserProfile)
    .post(validation(PROFILE), createOrUpdateUserProfile);
router.route('/experience').put(validation(EXPERIENCE), addExperienceToProfile);
router.route('/experience/:exp_id').delete(removeExperienceFromProfile);
router.route('/education').put(validation(EDUCATION), addEducationToProfile);
router.route('/education/:edu_id').delete(removeEducationFromProfile);

module.exports = router;
