const router = require('express').Router();
const { protectedRoute } = require('../controllers/authController');
const {
    getCurrentUserProfile,
    createOrUpdateUserProfile,
    deleteUserAndProfile,
    getAllUserProfiles,
    getProfileByHandle,
    getProfileByUserId,
    addExperienceToProfile,
    removeExperienceFromProfile,
    addEducationToProfile,
    removeEducationFromProfile,
} = require('../controllers/profileController');

// Public routes
router.route('/all').get(getAllUserProfiles);
router.route('/handle/:handle').get(getProfileByHandle);
router.route('/user/:userid').get(getProfileByUserId);

// Private routes
router
    .route('/')
    .get(protectedRoute, getCurrentUserProfile)
    .post(protectedRoute, createOrUpdateUserProfile)
    .delete(protectedRoute, deleteUserAndProfile);
router.route('/experience').post(protectedRoute, addExperienceToProfile);
router.route('/experience/:exp_id').delete(protectedRoute, removeExperienceFromProfile);
router.route('/education').post(protectedRoute, addEducationToProfile);
router.route('/education/:edu_id').delete(protectedRoute, removeEducationFromProfile);

module.exports = router;
