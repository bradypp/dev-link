import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import Moment from 'react-moment';
import moment from 'moment';
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
// TODO: Use a calendar component to allow choosing of dates?
const ProfileCertifications = ({ certifications }) => {
    return (
        <ProfileCard heading="Certifications">
            {certifications.map(item => {
                const { title, type, company, location, from, to, current, description } = item;

                const details = company ? (
                    <>
                        {company}
                        {location && <> &middot; {location} </>}
                    </>
                ) : (
                    <>{location && <>{location}</>}</>
                );

                const timePeriod = (
                    <>
                        <Moment format="DD/MM/YYYY">{moment.utc(from)}</Moment>
                        {' - '}
                        {!current ? <Moment format="DD/MM/YYYY">{moment.utc(to)}</Moment> : 'now'}
                    </>
                );

                return (
                    <ProfileCard.Item key={uuidv4()}>
                        <div>
                            <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                            <ProfileCard.Item.Subtitle>{details}</ProfileCard.Item.Subtitle>
                            <ProfileCard.Item.Subtitle>{timePeriod}</ProfileCard.Item.Subtitle>
                        </div>
                        {description && <p>{description}</p>}
                    </ProfileCard.Item>
                );
            })}
        </ProfileCard>
    );
};

ProfileCertifications.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileCertifications);
