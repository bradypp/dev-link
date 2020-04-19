import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfileBio } from 'redux/profiles';
import { ProfileCard } from 'components';

const propTypes = {
    bio: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
    bio: selectProfileBio,
});

// TODO: make possible/ add prompt to add bio if it doesn't already exist and is current authenticated users profile
// TODO: conditionally render component if viewed by other users & component is empty?
// TODO: add loader/don't render anything while loading
const ProfileAbout = ({ bio }) => (
    <ProfileCard heading="About Me">{bio ? <p>{bio}</p> : 'No bio for this profile'}</ProfileCard>
);

ProfileAbout.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileAbout);
