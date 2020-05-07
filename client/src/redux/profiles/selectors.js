import { createSelector } from 'reselect';

export const selectProfiles = state => state.profiles;

export const selectAllProfiles = createSelector([selectProfiles], profiles => profiles.profiles);

export const selectSkills = createSelector([selectProfiles], profiles => profiles.skills);

export const selectIsProfilesLoading = createSelector(
    [selectProfiles],
    profiles => profiles.isLoading,
);
