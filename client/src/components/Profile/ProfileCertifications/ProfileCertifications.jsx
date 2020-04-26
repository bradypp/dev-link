import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfileCertifications } from 'redux/profile';
import { dateTime } from 'shared/utils';
// import * as S from './ProfileCertificationsStyles';

const propTypes = {
    certifications: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    certifications: selectProfileCertifications,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Sort array by from (on backend)?
// TODO: Edit date formatting using util functions
const ProfileCertifications = ({ certifications }) => (
    <ProfileCard heading="Certifications">
        {certifications.map(item => {
            const { title, issuer, date, description } = item;

            return (
                <ProfileCard.Item key={uuidv4()}>
                    <div>
                        <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                        {issuer && <ProfileCard.Item.Subtitle>{issuer}</ProfileCard.Item.Subtitle>}
                        {date && (
                            <ProfileCard.Item.Subtitle>
                                <time>{dateTime.formatDate(date)}</time>
                            </ProfileCard.Item.Subtitle>
                        )}
                    </div>
                    {description && <p>{description}</p>}
                </ProfileCard.Item>
            );
        })}
    </ProfileCard>
);

ProfileCertifications.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileCertifications);
