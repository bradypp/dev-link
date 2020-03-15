const normalize = require('normalize-url');
const axios = require('axios');
const Profile = require('../../models/Profile');
const catchAsync = require('../../utils/catchAsync');

exports.getCurrentUserProfile = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const profile = await Profile.findOne({ user: id }).populate('user', [
        'name',
        'email',
        'avatar',
    ]);

    if (!profile) {
        return res.status(400).json({ profile: 'There is no profile for this user' });
    }

    res.json(profile);
});

exports.getAllUserProfiles = catchAsync(async (req, res, next) => {
    const profiles = await Profile.find().populate('user', ['name', 'email', 'avatar']);

    if (!profiles) {
        return res.status(400).json({ profiles: 'There are no profiles' });
    }

    res.json(profiles);
});

exports.getProfileByUserId = catchAsync(async (req, res, next) => {
    const { user_id } = req.params;
    const profile = await Profile.findOne({ user: user_id }).populate('user', [
        'name',
        'email',
        'avatar',
    ]);

    if (!profile) {
        return res.status(400).json({ profile: 'Profile not found' });
    }

    res.json(profile);
});

exports.createOrUpdateUserProfile = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const {
        company,
        location,
        website,
        bio,
        skills,
        status,
        github_username,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
    } = req.body;

    // Set fields
    const profileFields = {
        user: id,
        company,
        location,
        bio,
        status,
        github_username,
        website: website ? normalize(website, { forceHttps: true }) : '',
        skills: skills.split(',').map(skill => skill.trim()),
        social: {
            youtube: youtube ? normalize(youtube, { forceHttps: true }) : '',
            twitter: twitter ? normalize(twitter, { forceHttps: true }) : '',
            facebook: facebook ? normalize(facebook, { forceHttps: true }) : '',
            linkedin: linkedin ? normalize(linkedin, { forceHttps: true }) : '',
            instagram: instagram ? normalize(instagram, { forceHttps: true }) : '',
        },
    };

    // Find profile by user id and update if it exists, if not,upsert:true allows a new profile to be created
    const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true },
    );

    res.json(profile);
});

exports.addExperienceToProfile = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { title, company, location, from, to, current, description } = req.body;

    // Find profile
    const profile = await Profile.findOne({ user: id });

    // Make new experience object
    const newExp = { title, company, location, from, to, current, description };

    // Add experience to profile
    profile.experience.push(newExp);

    // Save profile and send response
    await profile.save();
    res.json(profile);
});

exports.removeExperienceFromProfile = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { exp_id } = req.params;

    // Find profile
    const profile = await Profile.findOne({ user: id });

    // Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(exp_id);

    // Splice out of array
    profile.experience.splice(removeIndex, 1);

    // Save profile and send response
    await profile.save();
    res.json(profile);
});

exports.addEducationToProfile = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { school, degree, field_of_study, from, to, current, description } = req.body;

    // Find profile
    const profile = await Profile.findOne({ user: id });

    // Make new education object
    const newEdu = { school, degree, field_of_study, from, to, current, description };

    // Add education to profile
    profile.education.push(newEdu);

    // Save profile and send response
    await profile.save();
    res.json(profile);
});

exports.removeEducationFromProfile = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const { edu_id } = req.params;

    // Find profile
    const profile = await Profile.findOne({ user: id });

    // Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(edu_id);

    // Splice out of array
    profile.education.splice(removeIndex, 1);

    // Save profile and send response
    await profile.save();
    res.json(profile);
});

exports.getUserGithubRepos = catchAsync(async (req, res, next) => {
    const githubRes = await axios.get(
        `https://api.github.com/users/${req.params.github_username}/repos?per_page=10&sort=created:asc`,
        {
            headers: {
                'user-agent': 'node.js',
                Accept: 'application/vnd.github.v3+json',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            },
        },
    );
    res.json(githubRes.data);
});
