const router = require('express').Router();
const { protected } = require('../controllers/authController');
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
const validation = require('../utils/validation');
const { PROFILE, EXPERIENCE, EDUCATION } = require('../utils/validation/validationTypes');

router.route('/all').get(getAllUserProfiles);
router.route('/user/:user_id').get(getProfileByUserId);
router.route('/github/:github_username').get(getUserGithubRepos);

// All routes after this middleware are protected
router.use(protected);

router
    .route('/')
    .get(getCurrentUserProfile)
    .post(validation(PROFILE), createOrUpdateUserProfile);
router.route('/experience').put(validation(EXPERIENCE), addExperienceToProfile);
router.route('/experience/:exp_id').delete(removeExperienceFromProfile);
router.route('/education').put(validation(EDUCATION), addEducationToProfile);
router.route('/education/:edu_id').delete(removeEducationFromProfile);

module.exports = router;
