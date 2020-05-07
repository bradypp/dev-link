import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfileExperience, selectIsCurrentUser } from 'redux/profile';
import { dateTime } from 'shared/utils';
import { Flex } from 'shared/components';
import ProfileEducationForm from './ProfileExperienceForm/ProfileExperienceForm';

const propTypes = {
    experience: PropTypes.array.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    experience: selectProfileExperience,
    isCurrentUser: selectIsCurrentUser,
});

// TODO: Sort array by from (on backend)?
const ProfileExperience = ({ experience, isCurrentUser }) => {
    return (
        <>
            {(experience.length > 0 || isCurrentUser) && (
                <ProfileCard
                    heading="Experience"
                    buttons={() =>
                        isCurrentUser && <ProfileEducationForm withAdd experience={experience} />
                    }>
                    {experience.map((item, i) => {
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
                                    <Flex justifyContent="space-between">
                                        <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                                        {isCurrentUser && (
                                            <ProfileEducationForm
                                                experience={experience}
                                                index={i}
                                            />
                                        )}
                                    </Flex>
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
            )}
        </>
    );
};

ProfileExperience.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileExperience);
