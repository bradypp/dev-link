const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.test = (req, res) => res.json({ msg: 'Users Works' });

// Create User
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
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
        const { email, password } = req.body;

        // Check user email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ email: 'User not found' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ password: 'Password incorrect' });

        // Return JWT
        res.json({ msg: 'Success' });
    } catch (err) {
        console.error(err);
    }
};
