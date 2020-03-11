import { createSelector } from 'reselect';

export const selectProfile = state => state.profile;

export const selectProfileLoading = createSelector([selectProfile], profile => profile.isLoading);

export const selectProfileData = createSelector(
    [selectProfile],
    profile => profile.profileData || {},
);

export const selectProfileInfo = createSelector([selectProfileData], profileData => {
    const { company, website, location, status, skills, github_username, bio } = profileData;
    return {
        company: company || '',
        website: website || '',
        location: location || '',
        status: status || '',
        skills: skills.join(','),
        github_username: github_username || '',
        bio: bio || '',
    };
});

export const selectProfileSocial = createSelector([selectProfileData], profileData => {
    const { twitter, facebook, linkedin, youtube, instagram } = profileData.social;
    return {
        twitter: twitter || '',
        facebook: facebook || '',
        linkedin: linkedin || '',
        youtube: youtube || '',
        instagram: instagram || '',
    };
});

export const selectProfileInfoAndSocial = createSelector(
    [selectProfileInfo, selectProfileSocial],
    (profileInfo, profileSocial) => {
        return { ...profileInfo, ...profileSocial };
    },
);

export const selectProfileEducation = createSelector(
    [selectProfileData],
    profileData => profileData.education || [],
);

export const selectProfileExperience = createSelector(
    [selectProfileData],
    profileData => profileData.experience || [],
);
