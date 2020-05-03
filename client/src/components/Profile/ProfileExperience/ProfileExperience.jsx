import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfileExperience } from 'redux/profile';
import { dateTime } from 'shared/utils';

const propTypes = {
    experience: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    experience: selectProfileExperience,
});

// TODO: Sort array by from (on backend)?
const ProfileExperience = ({ experience }) => {
    return (
        <ProfileCard heading="Experience">
            {experience.map(item => {
                const { title, company, location, from, to, current, description } = item;

                const details = company ? (
                    <>
                        {company}
                        {location && <span> &middot; {location} </span>}
                    </>
                ) : (
                    <>{location && <>{location}</>}</>
                );

                return (
                    <ProfileCard.Item key={uuidv4()}>
                        <div>
                            <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                            <ProfileCard.Item.Subtitle>{details}</ProfileCard.Item.Subtitle>
                            <ProfileCard.Item.Subtitle>
                                <time>{dateTime.formatDate(from)}</time>
                                {' - '}
                                {!current ? <time>{dateTime.formatDate(to)}</time> : 'now'}
                            </ProfileCard.Item.Subtitle>
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
