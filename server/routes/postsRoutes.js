const express = require('express');
const passport = require('passport');
const postsController = require('../controllers/postsController');

const router = express.Router();

const {
    getAllPosts,
    getPostById,
    createNewPost,
    deletePostById,
    addPostLike,
    removePostLike,
    addPostComment,
    removePostComment,
} = postsController;

// Public routes
router.route('/').get(getAllPosts);
router.route('/:id').get(getPostById);

// Private routes
router.route('/').post(passport.authenticate('jwt', { session: false }), createNewPost);
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), deletePostById);
router
    .route('/like/:id')
    .post(passport.authenticate('jwt', { session: false }), addPostLike)
    .delete(passport.authenticate('jwt', { session: false }), removePostLike);
router.route('/comment/:id').post(passport.authenticate('jwt', { session: false }), addPostComment);
router
    .route('/comment/:id/:comment_id')
    .delete(passport.authenticate('jwt', { session: false }), removePostComment);

module.exports = router;
