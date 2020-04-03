const User = require('../models/User');
const factory = require('./handlerFactory');
const { AppError, catchAsync, filterObject } = require('../utils');

exports.getUser = factory.getOneById(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOneById(User);
exports.deleteUser = factory.deleteOneById(User);

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

// Allows updating of name, email & active status
exports.updateMe = catchAsync(async (req, res, next) => {
    const { password, password2, email } = req.body;

    // Create error if user sends password data
    if (password || password2) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /auth/update-password.',
                400,
            ),
        );
    }

    if (email) {
        if (await User.findOne({ email })) {
            return next(new AppError('This email is already taken!', 400));
        }
    }

    const filteredBody = filterObject(req.body, ['name', 'email', 'active']);

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true });

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});
