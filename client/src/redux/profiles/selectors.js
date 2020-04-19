import { createSelector } from 'reselect';

export const selectProfiles = state => state.profiles;

export const selectIsProfileLoading = createSelector(
    [selectProfiles],
    profile => profile.isProfileLoading,
);

export const selectIsProfilesLoading = createSelector(
    [selectProfiles],
    profile => profile.isProfilesLoading,
);

export const selectAllProfiles = createSelector(
    [selectProfiles],
    profile => profile.profiles || [],
);

export const selectProfile = createSelector([selectProfiles], profile => profile.profile);

export const selectProfileInfo = createSelector(
    [selectProfile],
    ({ _id, headline, current_position, city, country, website, github_username, company }) => ({
        _id,
        headline,
        current_position,
        city,
        country,
        website,
        github_username,
        company,
    }),
);

export const selectProfileBio = createSelector([selectProfile], profile => profile.bio);

export const selectProfileUser = createSelector([selectProfile], profile => profile.user || {});

export const selectProfileSkills = createSelector([selectProfile], profile => profile.skills || []);

export const selectProfileSocials = createSelector(
    [selectProfile],
    profile => profile.socials || [],
);

export const selectProfileContact = createSelector(
    [selectProfile],
    profile => profile.contact || {},
);

export const selectProfileAvatar = createSelector(
    [selectProfile],
    profile => profile.avatar || 'default.jpg',
);

export const selectProfileCoverImage = createSelector(
    [selectProfile],
    profile => profile.cover_image || 'default.jpg',
);

export const selectProfileLookingFor = createSelector(
    [selectProfile],
    profile => profile.looking_for,
);

export const selectProfileInterests = createSelector([selectProfile], profile => profile.interests);

export const selectProfilePortfolio = createSelector([selectProfile], profile => profile.portfolio);

export const selectProfileStars = createSelector([selectProfile], profile => profile.stars || []);

export const selectProfileWatchers = createSelector(
    [selectProfile],
    profile => profile.watchers || [],
);

export const selectProfileEducation = createSelector([selectProfile], profile => profile.education);

export const selectProfileExperience = createSelector(
    [selectProfile],
    profile => profile.experience,
);
