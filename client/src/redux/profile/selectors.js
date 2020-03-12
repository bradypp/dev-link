import { createSelector } from 'reselect';

export const selectProfile = state => state.profile;

export const selectIsProfileLoading = createSelector([selectProfile], profile => profile.isLoading);

export const selectAllProfiles = createSelector([selectProfile], profile => profile.profiles || []);

export const selectProfileData = createSelector(
    [selectProfile],
    profile => profile.profileData || {},
);

export const selectProfileUser = createSelector([selectProfile], profile => profile.user || {});

export const selectProfileRepos = createSelector([selectProfile], profile => profile.repos || []);

export const selectProfileSkillsArr = createSelector(
    [selectProfileData],
    profileData => profileData.skills || [],
);

export const selectProfileInfo = createSelector(
    [selectProfileData],
    ({ company, website, location, status, skills, github_username, bio }) => {
        return {
            company: company || '',
            website: website || '',
            location: location || '',
            status: status || '',
            skills: skills ? skills.join(',') : '',
            github_username: github_username || '',
            bio: bio || '',
        };
    },
);

export const selectProfileSocial = createSelector([selectProfileData], ({ social }) => {
    if (!social) return {};
    const { twitter, facebook, linkedin, youtube, instagram } = social;
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
