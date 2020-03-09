const gravatar = require('gravatar');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createSendJwt = (user, statusCode, res) => {
    // Create payload
    const payload = { id: user.id };

    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // TODO: Add cookie options?
    // const cookieOptions = {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    // };
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // res.cookie('jwt', token, cookieOptions);

    // Remove password from response data
    // eslint-disable-next-line no-param-reassign
    user.password = undefined;

    // Send token & user data in response
    res.status(statusCode).json({
        token,
        // user,
    });
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with that email exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ user: 'User with this email already exists' });
        }

        // Get gravatar for that email & set a default
        const avatar = gravatar.url(email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm', // Default
        });

        // Create new user
        user = new User({
            name,
            email,
            avatar,
            password,
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Return JWT
        createSendJwt(user, 200, res);
    } catch (err) {
        return res.status(500).json({ msg: 'Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ user: 'Email or password incorrect' });
        }

        // Check password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ user: 'Email or password incorrect' });
        }

        // User matched - create and send JWT
        createSendJwt(user, 200, res);
    } catch (err) {
        return res.status(500).json({ msg: 'Server error' });
    }
};

exports.privateRoute = async (req, res, next) => {
    try {
        // Get token from header or cookies
        let token;
        if (req.header('x-auth-token')) {
            token = req.header('x-auth-token');
        }

        // TODO: Add cookie options?
        // else if (req.cookies.jwt) {
        //     token = req.cookies.jwt;
        // }

        // Check if token exists
        if (!token) {
            return res.status(401).json({ token: 'No token, authorization denied' });
        }

        // Remove bearer from token if it exists
        if (token.startsWith('Bearer')) {
            token = req.header('x-auth-token').split(' ')[1];
        }

        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Check if user still exists
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res
                .status(401)
                .json({ user: 'The user belonging to this token no longer exists' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
