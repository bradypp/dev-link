import { createSelector } from 'reselect';

export const selectProfile = state => state.profile;

export const selectProfileLoading = createSelector([selectProfile], profile => profile.isLoading);

export const selectProfileInfo = createSelector([selectProfile], profile => profile.profile);
