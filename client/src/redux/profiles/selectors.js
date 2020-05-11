import { createSelector } from 'reselect';

export const selectProfiles = state => state.profiles;

export const selectAllProfiles = createSelector([selectProfiles], profiles => profiles.profiles);

export const selectRecommendedProfiles = createSelector(
    [selectProfiles],
    profiles => profiles.recommendedProfiles,
);

export const selectNumberOfProfiles = createSelector(
    [selectAllProfiles],
    profiles => profiles.length,
);

export const selectAllSkills = createSelector([selectProfiles], profiles => profiles.allSkills);

export const selectAllDesiredRoles = createSelector(
    [selectProfiles],
    profiles => profiles.allDesiredRoles,
);

export const selectIsProfilesLoading = createSelector(
    [selectProfiles],
    profiles => profiles.isProfilesLoading,
);

export const selectIsMoreProfilesLoading = createSelector(
    [selectProfiles],
    profiles => profiles.isMoreProfilesLoading,
);

export const selectIsNoMoreProfiles = createSelector(
    [selectProfiles],
    profiles => profiles.isNoMoreProfiles,
);
