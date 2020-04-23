import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import {
    selectProfileBio,
    selectProfileLookingFor,
    selectProfileInterests,
    selectProfileGoals,
} from 'redux/profile';
import { ProfileCard, ProfileList } from 'components';
import { CustomLink } from 'shared/components';

const propTypes = {
    bio: PropTypes.string.isRequired,
    lookingFor: PropTypes.object.isRequired,
    goals: PropTypes.array.isRequired,
    interests: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    bio: selectProfileBio,
    lookingFor: selectProfileLookingFor,
    goals: selectProfileGoals,
    interests: selectProfileInterests,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Add links to custom links
// TODO: sanitize links to lower case on save
// TODO: add bullet points to goals and interests list items
const ProfileAbout = ({ bio, lookingFor, goals, interests }) => {
    const { roles, types: roleTypes, availability } = lookingFor;
    const shouldRenderLookingFor = roles.length > 0 || roleTypes.length > 0 || availability;

    return (
        <ProfileCard heading="About Me">
            {bio && (
                <ProfileCard.Item>
                    {/* <ProfileCard.Item.Heading>Bio</ProfileCard.Item.Heading> */}
                    <p>{bio || "There's currently no bio for this profile"}</p>
                </ProfileCard.Item>
            )}
            {shouldRenderLookingFor && (
                <ProfileCard.Item>
                    {/* <ProfileCard.Item.Heading>Looking For</ProfileCard.Item.Heading> */}
                    {roles.length > 0 && (
                        <p>
                            {roles.length === 1 ? 'Desired role: ' : 'Desired roles: '}
                            {roles.map((role, i) => (
                                <span key={uuidv4()}>
                                    <CustomLink to="#">{role}</CustomLink>
                                    {i !== roles.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                    )}
                    {roleTypes.length > 0 && (
                        <p>
                            {roleTypes.length === 1 ? 'Employment type: ' : 'Employment types: '}
                            {roleTypes.map((type, i) => (
                                <span key={uuidv4()}>
                                    <CustomLink to="#">{type}</CustomLink>
                                    {i !== roleTypes.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                    )}
                    {availability && <p>Availability: {availability}</p>}
                </ProfileCard.Item>
            )}
            {goals.length > 0 && (
                <ProfileCard.Item>
                    <ProfileCard.Item.Heading>Goals</ProfileCard.Item.Heading>
                    <ProfileList>
                        {goals.map(goal => (
                            <li key={uuidv4()}>{goal}</li>
                        ))}
                    </ProfileList>
                </ProfileCard.Item>
            )}
            {interests.length > 0 && (
                <ProfileCard.Item>
                    <ProfileCard.Item.Heading>Interests</ProfileCard.Item.Heading>
                    <ProfileList>
                        {interests.map(interest => (
                            <li key={uuidv4()}>{interest}</li>
                        ))}
                    </ProfileList>
                </ProfileCard.Item>
            )}
        </ProfileCard>
    );
};

ProfileAbout.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileAbout);
