import { createSelector } from 'reselect';

export const selectProfile = state => state.profile;

export const selectProfileLoading = createSelector([selectProfile], profile => profile.isLoading);

export const selectProfileInfo = createSelector([selectProfile], profile => profile.profileInfo);

export const selectProfileEducation = createSelector(
    [selectProfileInfo],
    profileInfo => profileInfo.education,
);

export const selectProfileExperience = createSelector(
    [selectProfileInfo],
    profileInfo => profileInfo.experience,
);
