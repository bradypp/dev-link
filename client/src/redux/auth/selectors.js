import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector([selectAuth], auth => auth.isAuthenticated);

export const selectIsUserLoading = createSelector([selectAuth], auth => auth.isLoading);

export const selectToken = createSelector([selectAuth], auth => auth.token);

export const selectUser = createSelector([selectAuth], auth => auth.user);

export const selectUserUsername = createSelector([selectUser], user => user.username);

export const selectUserId = createSelector([selectUser], user => user._id);

export const selectIsUserActive = createSelector([selectUser], user => user.active);
