import { createSelector } from 'reselect';

export const selectPosts = state => state.posts;

export const selectIsPostsLoading = createSelector([selectPosts], posts => posts.isLoading);

export const selectPostsArr = createSelector([selectPosts], posts => posts.posts);

export const selectPost = createSelector([selectPosts], posts => posts.post);
