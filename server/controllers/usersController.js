const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const createSendJwt = require('../utils/createSendJwt');
const validateRegisterInput = require('../utils/validation/validateRegisterInput');
const validateLoginInput = require('../utils/validation/validateLoginInput');

// Create User
exports.createUser = async (req, res) => {
    try {
        // Load input validation
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) return res.status(400).json(errors);

        let { name, email, password } = req.body;

        // Check if a user with that email exists
        const user = await User.findOne({ email });
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }

        // Get gravatar for that email & set a default
        const avatar = gravatar.url(email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm', // Default
        });

        // Create new user
        const newUser = new User({
            name,
            email,
            avatar,
            password,
        });

        // Encrypt password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                const savedUser = await newUser.save();
                res.json(savedUser);
            });
        });
    } catch (err) {
        console.error(err);
    }
};

// Login user / return JWT
exports.loginUser = async (req, res) => {
    try {
        // Load input validation
        const { errors, isValid } = validateLoginInput(req.body);

        // Check validation
        if (!isValid) return res.status(400).json(errors);

        const { email, password } = req.body;

        // Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
        }

        // User matched - create and send JWT
        createSendJwt(user, 200, res);
    } catch (err) {
        console.error(err);
    }
};

exports.currentUser = async (req, res) => {
    try {
        const { _id, name, email, avatar } = req.user;

        // Send current user info if authorized
        res.json({
            _id,
            name,
            email,
            avatar,
        });
    } catch (err) {
        console.error(err);
    }
};
