exports.getCurrentUser = (req, res) => {
    const errors = {};

    if (!req.user) {
        errors.no_user = 'User not found';
        return res.status(404).json(errors);
    }

    res.json(req.user);
};
