import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector([selectAuth], auth => auth.isAuthenticated);

export const selectIsAuthLoading = createSelector([selectAuth], auth => auth.isLoading);

export const selectToken = createSelector([selectAuth], auth => auth.token);

export const selectUserData = createSelector([selectAuth], auth => auth.user);

export const selectUserFirstName = createSelector(
    [selectUserData],
    user => user.name.split(' ')[0],
);
