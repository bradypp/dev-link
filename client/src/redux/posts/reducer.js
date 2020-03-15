import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
} from 'redux/actionTypes';

const initialState = {
    posts: [],
    post: {},
    isLoading: true,
};

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                isLoading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                isLoading: false,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                isLoading: false,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                isLoading: false,
            };
        case POST_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload._id ? { ...post, likes: payload.likes } : post.likes,
                ),
                isLoading: false,
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                isLoading: false,
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload),
                },
                isLoading: false,
            };
        default:
            return state;
    }
}
