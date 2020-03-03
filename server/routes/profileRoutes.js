const express = require('express');
const passport = require('passport');
const profileController = require('../controllers/profileController');

const router = express.Router();

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
} = profileController;

// Public routes
router.route('/all').get(getAllUserProfiles);
router.route('/handle/:handle').get(getProfileByHandle);
router.route('/user/:userid').get(getProfileByUserId);

// Private routes
router
    .route('/')
    .get(passport.authenticate('jwt', { session: false }), getCurrentUserProfile)
    .post(passport.authenticate('jwt', { session: false }), createOrUpdateUserProfile)
    .delete(passport.authenticate('jwt', { session: false }), deleteUserAndProfile);
router
    .route('/experience')
    .post(passport.authenticate('jwt', { session: false }), addExperienceToProfile);
router
    .route('/experience/:exp_id')
    .delete(passport.authenticate('jwt', { session: false }), removeExperienceFromProfile);
router
    .route('/education')
    .post(passport.authenticate('jwt', { session: false }), addEducationToProfile);
router
    .route('/education/:edu_id')
    .delete(passport.authenticate('jwt', { session: false }), removeEducationFromProfile);

module.exports = router;
