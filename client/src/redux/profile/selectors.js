import { createSelector } from 'reselect';

export const selectProfile = state => state.profile;

export const selectProfileLoading = createSelector([selectProfile], profile => profile.isLoading);

export const selectProfileData = createSelector([selectProfile], profile =>
    profile.profileData ? profile.profileData : {},
);

export const selectProfileSocial = createSelector([selectProfileData], profileData =>
    profileData.social ? profileData.social : {},
);

export const selectProfileEducation = createSelector([selectProfileData], profileData =>
    profileData.education ? profileData.education : {},
);

export const selectProfileExperience = createSelector([selectProfileData], profileData =>
    profileData.experience ? profileData.experience : {},
);
