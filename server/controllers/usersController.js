exports.getCurrentUser = (req, res) => {
    if (!req.user) {
        return res.status(404).json({ user: 'User not found' });
    }

    res.json(req.user);
};
