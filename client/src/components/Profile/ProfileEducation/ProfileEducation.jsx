import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Flex } from 'shared/components';
import { ProfileCard } from 'components';
import { dateTime } from 'shared/utils';
import { selectProfileEducation, selectIsCurrentUser } from 'redux/profile';
import ProfileEducationForm from './ProfileEducationForm/ProfileEducationForm';

const propTypes = {
    education: PropTypes.array.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    education: selectProfileEducation,
    isCurrentUser: selectIsCurrentUser,
});

// TODO: Sort array by from (on backend)?
const ProfileEducation = ({ education, isCurrentUser }) => (
    <ProfileCard
        heading="Education"
        buttons={() => <ProfileEducationForm withAdd education={education} />}>
        {education.map((item, i) => {
            const {
                school,
                school_type,
                qualification_type,
                subjects,
                from,
                to,
                current,
                description,
            } = item;

            const details = school_type ? (
                <>
                    <span>{school_type}</span>
                    {qualification_type && <span> &middot; {qualification_type} </span>}
                    {subjects.length > 0 && <> &middot; </>}
                    {subjects.length > 0 &&
                        subjects.map((subject, i) => {
                            const { title, grade } = subject;
                            return (
                                <span key={uuidv4()}>
                                    {grade ? `${title}: ${grade}` : title}
                                    {i !== subjects.length - 1 && ', '}
                                </span>
                            );
                        })}
                </>
            ) : (
                <>{qualification_type && <span>{qualification_type}</span>}</>
            );

            return (
                <ProfileCard.Item key={uuidv4()}>
                    <div>
                        <Flex justifyContent="space-between">
                            <ProfileCard.Item.Heading>{school}</ProfileCard.Item.Heading>
                            {isCurrentUser && (
                                <ProfileEducationForm education={education} index={i} />
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
);

ProfileEducation.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileEducation);
