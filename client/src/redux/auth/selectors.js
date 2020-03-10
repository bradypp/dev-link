import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector([selectAuth], auth => auth.isAuthenticated);

export const selectIsLoading = createSelector([selectAuth], auth => auth.isLoading);

export const selectToken = createSelector([selectAuth], auth => auth.token);

export const selectUser = createSelector([selectAuth], auth => auth.user);

export const selectUserName = createSelector([selectUser], user => user.name);

export const selectUserFirstName = createSelector(
    [selectUserName],
    userName => userName.split(' ')[0],
);
