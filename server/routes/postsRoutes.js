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
const { validate, postValidationRules } = require('../validation');

// Protected routes
router.route('/').get(protectedRoute, getAllPosts);
router.route('/:id').get(protectedRoute, getPostById);
router.route('/').post(protectedRoute, postValidationRules(), validate, createNewPost);
router.route('/:id').delete(protectedRoute, deletePostById);
router
    .route('/like/:id')
    .post(protectedRoute, addPostLike)
    .delete(protectedRoute, removePostLike);
router.route('/comment/:id').post(protectedRoute, addPostComment);
router.route('/comment/:id/:comment_id').delete(protectedRoute, removePostComment);

module.exports = router;
