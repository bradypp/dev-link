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
const validation = require('../controllers/api/validation');
const { POST, POST_COMMENT } = require('../controllers/api/validation/validationTypes');

// Private routes
router
    .route('/')
    .get(privateRoute, getAllPosts)
    .post(privateRoute, validation(POST), createNewPost);
router
    .route('/:id')
    .get(privateRoute, getPostById)
    .delete(privateRoute, deletePostById);
router.route('/like/:id').put(privateRoute, addPostLike);
router.route('/unlike/:id').put(privateRoute, removePostLike);
router.route('/comment/:id').post(privateRoute, validation(POST_COMMENT), addPostComment);
router.route('/comment/:id/:comment_id').delete(privateRoute, removePostComment);

module.exports = router;
