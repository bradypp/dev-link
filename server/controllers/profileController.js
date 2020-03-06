const User = require('../models/User');
const Profile = require('../models/Profile');
const validateProfileInput = require('../utils/validation/validateProfileInput');
const validateExperienceInput = require('../utils/validation/validateExperienceInput');
const validateEducationInput = require('../utils/validation/validateEducationInput');

exports.getCurrentUserProfile = async (req, res) => {
    try {
        const errors = {};
        const { id } = req.user;
        const profile = await Profile.findOne({ user: id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            errors.no_profile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.getAllUserProfiles = async (req, res) => {
    try {
        const errors = {};
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);

        if (!profiles) {
            errors.noprofiles = 'There are no profiles';
            return res.status(404).json(errors);
        }

        res.json(profiles);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.getProfileByHandle = async (req, res) => {
    try {
        const errors = {};
        const { handle } = req.params;
        const profile = await Profile.findOne({ handle }).populate('user', ['name', 'avatar']);

        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.getProfileByUserId = async (req, res) => {
    try {
        const errors = {};
        const { user_id } = req.params;
        const profile = await Profile.findOne({ user: user_id }).populate('user', [
            'name',
            'avatar',
        ]);

        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    } catch (err) {
        res.status(404).json({ profile: 'There is no profile for this user' });
    }
};

exports.createOrUpdateUserProfile = async (req, res) => {
    try {
        // Check validation
        const { errors, isValid } = validateProfileInput(req.body);
        if (!isValid) return res.status(400).json(errors);

        // Set fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.github_username) profileFields.github_username = req.body.github_username;

        // Split skills into an array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Set socials
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        const { id } = req.user;

        // Find profile
        const profile = await Profile.findOne({ user: id });
        if (profile) {
            // If profile exists, update it
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: id },
                { $set: profileFields },
                { new: true },
            );
            res.json(updatedProfile);
        } else {
            // If profile doesn't exist, create it
            // Check if handle exists first
            const profileHandleCheck = await Profile.findOne({
                handle: profileFields.handle,
            });
            if (profileHandleCheck) {
                errors.handle = 'That profile handle already exists';
                return res.status(400).json(errors);
            }

            // Create and save new profile
            const newProfile = await new Profile(profileFields).save();
            res.json(newProfile);
        }
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.addExperienceToProfile = async (req, res) => {
    try {
        // Check validation
        const { errors, isValid } = validateExperienceInput(req.body);
        if (!isValid) return res.status(400).json(errors);

        // Find profile
        const { id } = req.user;
        const profile = await Profile.findOne({ user: id });

        // Make new experience object
        const { title, company, location, from, to, current, description } = req.body;
        const newExp = { title, company, location, from, to, current, description };

        // Add experience to profile
        profile.experience.unshift(newExp);

        // Save profile and send response
        const savedProfile = await profile.save();
        res.json(savedProfile);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.addEducationToProfile = async (req, res) => {
    try {
        // Check validation
        const { errors, isValid } = validateEducationInput(req.body);
        if (!isValid) return res.status(400).json(errors);

        // Find profile
        const { id } = req.user;
        const profile = await Profile.findOne({ user: id });

        // Make new education object
        const { school, degree, field_of_study, from, to, current, description } = req.body;
        const newEdu = { school, degree, field_of_study, from, to, current, description };

        // Add education to profile
        profile.education.unshift(newEdu);

        // Save profile and send response
        const savedProfile = await profile.save();
        res.json(savedProfile);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.removeExperienceFromProfile = async (req, res) => {
    try {
        // Find profile
        const { id } = req.user;
        const profile = await Profile.findOne({ user: id });

        // Get remove index
        const { exp_id } = req.params;
        const removeIndex = profile.experience.map(item => item.id).indexOf(exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save profile and send response
        const savedProfile = await profile.save();
        res.json(savedProfile);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.removeEducationFromProfile = async (req, res) => {
    try {
        // Find profile
        const { id } = req.user;
        const profile = await Profile.findOne({ user: id });

        // Get remove index
        const { edu_id } = req.params;
        const removeIndex = profile.education.map(item => item.id).indexOf(edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save profile and send response
        const savedProfile = await profile.save();
        res.json(savedProfile);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.deleteUserAndProfile = async (req, res) => {
    try {
        const { id } = req.user;
        await Profile.findOneAndRemove({ user: id });
        await User.findOneAndRemove({ _id: id });
        res.json({ success: true });
    } catch (err) {
        res.status(404).json(err);
    }
};
