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

// All routes after this middleware are private
router.use(privateRoute);

router
    .route('/')
    .get(getAllPosts)
    .post(validation(POST), createNewPost);
router
    .route('/:id')
    .get(getPostById)
    .delete(deletePostById);
router.route('/like/:id').put(addPostLike);
router.route('/unlike/:id').put(removePostLike);
router.route('/comment/:id').post(validation(POST_COMMENT), addPostComment);
router.route('/comment/:id/:comment_id').delete(removePostComment);

module.exports = router;
