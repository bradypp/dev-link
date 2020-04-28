import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { dateTime } from 'shared/utils';
import { selectProfileEducation } from 'redux/profile';
// import * as S from './ProfileEducationStyles';

const propTypes = {
    education: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    education: selectProfileEducation,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Sort array by from (on backend)?
// TODO: Edit date formatting using util functions
// TODO: Have a current toggle on form to disable to
const ProfileEducation = ({ education }) => (
    <ProfileCard heading="Education">
        {education.map(item => {
            const {
                school,
                school_type: schoolType,
                qualification_type: qualificationType,
                subjects,
                from,
                to,
                current,
                description,
            } = item;

            const details = schoolType ? (
                <>
                    <span>{schoolType}</span>
                    {qualificationType && <span> &middot; {qualificationType} </span>}
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
                <>{qualificationType && <span>{qualificationType}</span>}</>
            );

            const timePeriod = (
                <>
                    <time>{dateTime.formatDate(from)}</time>
                    {' - '}
                    {!current ? <time>{dateTime.formatDate(to)}</time> : 'now'}
                </>
            );

            return (
                <ProfileCard.Item key={uuidv4()}>
                    <div>
                        <ProfileCard.Item.Heading>{school}</ProfileCard.Item.Heading>
                        <ProfileCard.Item.Subtitle>{details}</ProfileCard.Item.Subtitle>
                        <ProfileCard.Item.Subtitle>{timePeriod}</ProfileCard.Item.Subtitle>
                    </div>
                    {description && <p>{description}</p>}
                </ProfileCard.Item>
            );
        })}
    </ProfileCard>
);

ProfileEducation.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileEducation);
