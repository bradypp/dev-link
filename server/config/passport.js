/* eslint-disable camelcase */
const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                return user ? done(null, user) : done(null, false);
            } catch (err) {
                console.error(err);
            }
        }),
    );
};
