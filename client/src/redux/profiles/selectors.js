import { createSelector } from 'reselect';

export const selectProfiles = state => state.profiles;

export const selectAllProfiles = createSelector([selectProfiles], profiles => profiles.profiles);

export const selectAllSkills = createSelector([selectProfiles], profiles => profiles.allSkills);

export const selectAllDesiredRoles = createSelector(
    [selectProfiles],
    profiles => profiles.allDesiredRoles,
);

export const selectIsProfilesLoading = createSelector(
    [selectProfiles],
    profiles => profiles.isLoading,
);
