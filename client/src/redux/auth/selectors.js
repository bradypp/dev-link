import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectSubSection = createSelector([selectAuth], auth => auth.subSection);
