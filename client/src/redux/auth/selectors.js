import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectSubSection = createSelector([selectAuth], auth => auth.subSection);
