import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { selectProfileAboutMe, selectIsCurrentUser } from 'redux/profile';
import { ProfileCard } from 'components';
import { CustomLink } from 'shared/components';
import ProfileAboutForm from './ProfileAboutForm/ProfileAboutForm';

const propTypes = {
    aboutMe: PropTypes.object.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    aboutMe: selectProfileAboutMe,
    isCurrentUser: selectIsCurrentUser,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Add links to custom links
// TODO: sanitize links to lower case on save
// TODO: change lists below to buttons with margin between them?
const ProfileAbout = ({ aboutMe, isCurrentUser }) => {
    const { bio, desired_roles, role_types, availability } = aboutMe;

    return (
        <>
            {(bio ||
                desired_roles.length > 0 ||
                role_types.length > 0 ||
                availability ||
                isCurrentUser) && (
                <ProfileCard
                    heading="About Me"
                    buttons={() => isCurrentUser && <ProfileAboutForm formData={aboutMe} />}>
                    {!isEmpty(aboutMe) && (
                        <>
                            {bio && (
                                <ProfileCard.Item>
                                    <p>{bio}</p>
                                </ProfileCard.Item>
                            )}
                            {desired_roles.length > 0 && role_types.length > 0 && availability && (
                                <ProfileCard.Item>
                                    {desired_roles.length > 0 && (
                                        <p>
                                            {desired_roles.length === 1
                                                ? 'Desired role: '
                                                : 'Desired desired_roles: '}
                                            {desired_roles.map((role, i) => (
                                                <span key={uuidv4()}>
                                                    <CustomLink to="#">{role}</CustomLink>
                                                    {i !== desired_roles.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </p>
                                    )}
                                    {role_types.length > 0 && (
                                        <p>
                                            {role_types.length === 1
                                                ? 'Desired role type: '
                                                : 'Desired role types: '}
                                            {role_types.map((type, i) => (
                                                <span key={uuidv4()}>
                                                    <CustomLink to="#">{type}</CustomLink>
                                                    {i !== role_types.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </p>
                                    )}
                                    {availability && <p>Available: {availability}</p>}
                                </ProfileCard.Item>
                            )}
                        </>
                    )}
                </ProfileCard>
            )}
        </>
    );
};

ProfileAbout.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileAbout);
