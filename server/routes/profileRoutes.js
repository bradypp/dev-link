const express = require('express');
const passport = require('passport');
const profileController = require('../controllers/profileController');

const router = express.Router();

const {
    getCurrentUserProfile,
    createOrUpdateUserProfile,
    getAllUserProfiles,
    getProfileByHandle,
    getProfileByUserId,
    addExperienceToProfile,
    addEducationToProfile,
} = profileController;

// Public routes
router.route('/all').get(getAllUserProfiles);
router.route('/handle/:handle').get(getProfileByHandle);
router.route('/user/:userid').get(getProfileByUserId);

// Private routes
router
    .route('/')
    .get(passport.authenticate('jwt', { session: false }), getCurrentUserProfile)
    .post(passport.authenticate('jwt', { session: false }), createOrUpdateUserProfile);
router
    .route('/experience')
    .post(passport.authenticate('jwt', { session: false }), addExperienceToProfile);
router
    .route('/education')
    .post(passport.authenticate('jwt', { session: false }), addEducationToProfile);

module.exports = router;
