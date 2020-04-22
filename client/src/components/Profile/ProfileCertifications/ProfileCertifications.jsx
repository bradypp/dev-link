import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfileCertifications } from 'redux/profiles';
import { CustomLink } from 'shared/components';
import * as S from './ProfileCertificationsStyles';

const propTypes = {
    certifications: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    certifications: selectProfileCertifications,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Sort array by from (on backend)?
// TODO: Use a calendar component to allow choosing of dates?
const ProfileCertifications = ({ certifications }) => {
    return <ProfileCard heading="Certifications">certifications</ProfileCard>;
};

ProfileCertifications.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileCertifications);
