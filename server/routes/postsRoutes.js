const router = require('express').Router();
const { privateRoute } = require('../controllers/api/authController');
const {
    getAllPosts,
    getPostById,
    createNewPost,
    deletePostById,
    addPostLike,
    removePostLike,
    addPostComment,
    removePostComment,
} = require('../controllers/api/postsController');
const { postValidation, postCommentValidation } = require('./validation/posts');

// Private routes
router
    .route('/')
    .get(privateRoute, getAllPosts)
    .post(privateRoute, postValidation(), createNewPost);
router
    .route('/:id')
    .get(privateRoute, getPostById)
    .delete(privateRoute, deletePostById);
router.route('/like/:id').put(privateRoute, addPostLike);
router.route('/unlike/:id').put(privateRoute, removePostLike);
router.route('/comment/:id').post(privateRoute, postCommentValidation(), addPostComment);
router.route('/comment/:id/:comment_id').delete(privateRoute, removePostComment);

module.exports = router;
