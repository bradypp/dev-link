import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector([selectAuth], auth => auth.isAuthenticated);

export const selectIsLoading = createSelector([selectAuth], auth => auth.isLoading);

export const selectUser = createSelector([selectAuth], auth => auth.user);
