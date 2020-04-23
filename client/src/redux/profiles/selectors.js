import { createSelector } from 'reselect';

export const selectProfiles = state => state.profiles;

export const selectAllProfiles = createSelector([selectProfiles], profile => profile.profiles);

export const selectIsProfilesLoading = createSelector(
    [selectProfiles],
    profiles => profiles.isLoading,
);
