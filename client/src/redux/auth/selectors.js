import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector([selectAuth], auth => auth.isAuthenticated);

export const selectIsUserLoading = createSelector([selectAuth], auth => auth.isUserLoading);

export const selectToken = createSelector([selectAuth], auth => auth.token);

export const selectUser = createSelector([selectAuth], auth => auth.user);

export const selectUserFirstName = createSelector([selectUser], user => user.first_name || '');

export const selectUserId = createSelector([selectUser], user => user._id || '');
