import { createSelector } from 'reselect';

export const selectProfile = state => state.profile;

export const selectIsProfileLoading = createSelector([selectProfile], profile => profile.isLoading);

export const selectIsCurrentUser = createSelector(
    [selectProfile],
    profile => profile.isCurrentUser,
);

export const selectCurrentProfile = createSelector([selectProfile], profile => profile.profile);

export const selectProfileInfo = createSelector(
    [selectCurrentProfile],
    ({
        _id,
        name,
        headline,
        current_position,
        city,
        country,
        website,
        github_username,
        company,
    }) => ({
        _id,
        name,
        headline,
        current_position,
        city,
        country,
        website,
        github_username,
        company,
    }),
);

export const selectProfileAboutMe = createSelector(
    [selectCurrentProfile],
    profile => profile.about_me || {},
);

export const selectProfileInterests = createSelector(
    [selectCurrentProfile],
    profile => profile.interests || [],
);

export const selectProfileGoals = createSelector(
    [selectCurrentProfile],
    profile => profile.goals || [],
);

export const selectProfileUser = createSelector(
    [selectCurrentProfile],
    profile => profile.user || {},
);

export const selectProfileUserId = createSelector([selectProfileUser], user => user._id);

export const selectProfileSkills = createSelector(
    [selectCurrentProfile],
    profile => profile.skills || [],
);

export const selectProfileSocials = createSelector(
    [selectCurrentProfile],
    profile => profile.socials || [],
);

export const selectProfileContact = createSelector(
    [selectCurrentProfile],
    profile => profile.contact || {},
);

export const selectProfileAvatar = createSelector(
    [selectCurrentProfile],
    profile => profile.avatar || {},
);

export const selectProfileCoverImage = createSelector(
    [selectCurrentProfile],
    profile => profile.cover_image || {},
);

export const selectProfilePortfolio = createSelector(
    [selectCurrentProfile],
    profile => profile.portfolio || [],
);

export const selectProfileStars = createSelector(
    [selectCurrentProfile],
    profile => profile.stars || [],
);

export const selectProfileWatchers = createSelector(
    [selectCurrentProfile],
    profile => profile.watchers || [],
);

export const selectProfileEducation = createSelector(
    [selectCurrentProfile],
    profile => profile.education || [],
);

export const selectProfileCertifications = createSelector(
    [selectCurrentProfile],
    profile => profile.certifications || [],
);

export const selectProfileExperience = createSelector(
    [selectCurrentProfile],
    profile => profile.experience || [],
);
