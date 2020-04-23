import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { selectProfileInterests } from 'redux/profile';
import { ProfileCard, ProfileList } from 'components';

const propTypes = {
    interests: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    interests: selectProfileInterests,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Add links to custom links
// TODO: sanitize links to lower case on save
// TODO: add bullet points to goals and interests list items
const ProfileAbout = ({ interests }) => (
    <ProfileCard heading="Interests">
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

ProfileAbout.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileAbout);
