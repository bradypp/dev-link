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

const initialState = {
    posts: [],
    post: {},
    isLoading: true,
};

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case POSTS_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GET_POSTS: {
            const { posts } = payload.data;
            return {
                ...state,
                isLoading: false,
                posts,
            };
        }
        case GET_POST: {
            const { post } = payload.data;
            return {
                ...state,
                isLoading: false,
                post,
            };
        }
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
        case UPDATE_LIKES: {
            const { _id, likes } = payload.data.post;
            return {
                ...state,
                posts: state.posts.map(post => (post._id === _id ? { ...post, likes } : post)),
                isLoading: false,
            };
        }
        case ADD_COMMENT: {
            const { comments } = payload.data;
            return {
                ...state,
                post: { ...state.post, comments },
                isLoading: false,
            };
        }
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
