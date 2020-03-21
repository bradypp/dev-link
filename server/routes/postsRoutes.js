const router = require('express').Router();
const { protected } = require('../controllers/authController');
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
const validation = require('../utils/validation');
const { POST, POST_COMMENT } = require('../utils/validation/validationTypes');

// All routes after this middleware are protected
router.use(protected);

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
