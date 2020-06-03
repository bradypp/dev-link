import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
                    {(bio || desired_roles.length > 0 || role_types.length > 0 || availability) && (
                        <ProfileCard.Item>
                            {bio && <p>{bio}</p>}
                            {desired_roles.length > 0 && (
                                <p>
                                    {desired_roles.length === 1
                                        ? 'Desired role: '
                                        : 'Desired roles: '}
                                    {desired_roles.map((role, i) => (
                                        <span key={uuidv4()}>
                                            {role.toLowerCase()}
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
                                            <CustomLink to={`/developers?rt=${type}`}>
                                                {type.toLowerCase()}
                                            </CustomLink>
                                            {i !== role_types.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>
                            )}
                            {availability && (
                                <span>
                                    Available:{' '}
                                    <CustomLink to={`/developers?av=${availability}`}>
                                        {availability.toLowerCase()}
                                    </CustomLink>
                                </span>
                            )}
                        </ProfileCard.Item>
                    )}
                </ProfileCard>
            )}
        </>
    );
};

ProfileAbout.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileAbout);
