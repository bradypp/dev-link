import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import Moment from 'react-moment';
import moment from 'moment';
import { selectProfileExperience } from 'redux/profile';
// import * as S from './ProfileExperienceStyles';

const propTypes = {
    experience: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    experience: selectProfileExperience,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Sort array by from (on backend)?
// TODO: Edit date formatting using util functions
// TODO: Have a current toggle on form to disable to
const ProfileExperience = ({ experience }) => {
    return (
        <ProfileCard heading="Experience">
            {experience.map(item => {
                const { title, company, location, from, to, current, description } = item;

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
                        <Moment format="MM/YYYY">{moment.utc(from)}</Moment>
                        {' - '}
                        {!current ? <Moment format="MM/YYYY">{moment.utc(to)}</Moment> : 'now'}
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

ProfileExperience.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileExperience);
