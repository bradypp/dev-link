const { body } = require('express-validator');

exports.profileValidationRules = () => {
    return [
        body('status', 'Status is required').notEmpty(),
        body('skills', 'Skills are required').notEmpty(),
    ];
};

exports.experienceValidationRules = () => {
    return [
        body('title', 'Title is required').notEmpty(),
        body('company', 'Company is required').notEmpty(),
        body('from', 'From date is required and needs to be from the past')
            .notEmpty()
            .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ];
};

exports.educationValidationRules = () => {
    return [
        body('school', 'School is required').notEmpty(),
        body('degree', 'Degree is required').notEmpty(),
        body('field_of_study', 'Field of study is required').notEmpty(),
        body('from', 'From date is required and needs to be from the past')
            .notEmpty()
            .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ];
};
