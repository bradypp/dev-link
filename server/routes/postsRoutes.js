const router = require('express').Router();
const { privateRoute } = require('../controllers/authController');
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

// Private routes
router
    .route('/')
    .get(privateRoute, getAllPosts)
    .post(privateRoute, postValidationRules(), validate, createNewPost);
router
    .route('/:id')
    .get(privateRoute, getPostById)
    .delete(privateRoute, deletePostById);
router.route('/like/:id').put(privateRoute, addPostLike);
router.route('/unlike/:id').put(privateRoute, removePostLike);
router
    .route('/comment/:id')
    .post(privateRoute, postCommentValidationRules(), validate, addPostComment);
router.route('/comment/:id/:comment_id').delete(privateRoute, removePostComment);

module.exports = router;
