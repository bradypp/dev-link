import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import Moment from 'react-moment';
import moment from 'moment';
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
                    {schoolType}
                    {qualificationType && <> &middot; {qualificationType} </>}
                    {subjects.length > 0 && <> &middot; </>}
                    {subjects.length > 0 &&
                        subjects.map((subject, i) => {
                            const { title, grade } = subject;
                            return (
                                <>
                                    {grade ? `${title}: ${grade}` : title}
                                    {i !== subjects.length - 1 && ', '}
                                </>
                            );
                        })}
                </>
            ) : (
                <>{qualificationType && <>{qualificationType}</>}</>
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
