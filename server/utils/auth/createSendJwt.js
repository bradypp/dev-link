const jwt = require('jsonwebtoken');

const createSendJwt = (user, statusCode, res) => {
    // Create payload
    const { id, name, email, avatar } = user;
    const payload = { id, name, avatar };

    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Cookie options
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Send token & user data in response
    res.status(statusCode).json({
        status: 'success',
        token: `Bearer ${token}`,
        data: {
            id,
            name,
            email,
            avatar,
        },
    });
};

module.exports = createSendJwt;
