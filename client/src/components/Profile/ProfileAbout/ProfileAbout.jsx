import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { selectProfileAboutMe } from 'redux/profile';
import { ProfileCard } from 'components';
import { CustomLink } from 'shared/components';

const propTypes = {
    aboutMe: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    aboutMe: selectProfileAboutMe,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Add links to custom links
// TODO: sanitize links to lower case on save
// TODO: change lists below to buttons with margin between them?
const ProfileAbout = ({ aboutMe }) => {
    const { bio, roles, types: roleTypes, availability } = aboutMe;

    return (
        <ProfileCard heading="About Me">
            {!isEmpty(aboutMe) && (
                <ProfileCard.Item>
                    {bio && <p>{bio || "There's currently no bio for this profile"}</p>}
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
                            {roleTypes.length === 1
                                ? 'Desired role type: '
                                : 'Desired role types: '}
                            {roleTypes.map((type, i) => (
                                <span key={uuidv4()}>
                                    <CustomLink to="#">{type}</CustomLink>
                                    {i !== roleTypes.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                    )}
                    {availability && <p>Available: {availability}</p>}
                </ProfileCard.Item>
            )}
        </ProfileCard>
    );
};

ProfileAbout.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileAbout);
