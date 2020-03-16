import { api, errorHandler } from 'utils';
import { setAlert } from 'redux/alerts';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    POSTS_LOADING,
} from 'redux/actionTypes';

// Post error
export const postError = () => async dispatch => {
    dispatch({
        type: POST_ERROR,
    });
};

// Get posts
export const getPosts = () => async dispatch => {
    try {
        dispatch({
            type: POSTS_LOADING,
        });

        const res = await api.get('/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        errorHandler(err, dispatch, postError);
    }
};

// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data,
        });
    } catch (err) {
        errorHandler(err, dispatch, postError);
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await api.put(`/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data,
        });
    } catch (err) {
        errorHandler(err, dispatch, postError);
    }
};

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await api.delete(`/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id,
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        errorHandler(err, dispatch, postError);
    }
};

// Add post
export const addPost = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post('/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        errorHandler(err, dispatch, postError, true);
    }
};

// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await api.get(`/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        errorHandler(err, dispatch, postError);
    }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await api.post(`/posts/comment/${postId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        errorHandler(err, dispatch, postError, true);
    }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await api.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        errorHandler(err, dispatch, postError);
    }
};
