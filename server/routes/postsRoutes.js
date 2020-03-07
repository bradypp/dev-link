const router = require('express').Router();
const { protectedRoute } = require('../controllers/authController');
const {
    getAllPosts,
    getPostById,
    createNewPost,
    deletePostById,
    addPostLike,
    removePostLike,
    addPostComment,
    removePostComment,
} = require('../controllers/postsController');
const { validate, postValidationRules, postCommentValidationRules } = require('../validation');

// Protected routes
router
    .route('/')
    .get(protectedRoute, getAllPosts)
    .post(protectedRoute, postValidationRules(), validate, createNewPost);
router
    .route('/:id')
    .get(protectedRoute, getPostById)
    .delete(protectedRoute, deletePostById);
router.route('/like/:id').put(protectedRoute, addPostLike);
router.route('/unlike/:id').put(protectedRoute, removePostLike);
router
    .route('/comment/:id')
    .post(protectedRoute, postCommentValidationRules(), validate, addPostComment);
router.route('/comment/:id/:comment_id').delete(protectedRoute, removePostComment);

module.exports = router;
