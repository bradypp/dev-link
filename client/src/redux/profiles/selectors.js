import { createSelector } from 'reselect';

export const selectProfiles = state => state.profiles;

export const selectIsProfileLoading = createSelector(
    [selectProfiles],
    profile => profile.isLoading,
);

export const selectAllProfiles = createSelector(
    [selectProfiles],
    profile => profile.profiles || [],
);

export const selectProfile = createSelector([selectProfiles], profile => profile.profile || {});

export const selectProfileUser = createSelector([selectProfiles], profile => profile.user || {});

export const selectProfileRepos = createSelector([selectProfile], profile => profile.repos || []);

export const selectProfileSkillsArr = createSelector(
    [selectProfile],
    profile => profile.skills || [],
);

export const selectProfileInfo = createSelector(
    [selectProfile],
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

export const selectProfileSocial = createSelector([selectProfile], ({ social }) => {
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
    [selectProfile],
    profileData => profileData.education || [],
);

export const selectProfileExperience = createSelector(
    [selectProfile],
    profileData => profileData.experience || [],
);
