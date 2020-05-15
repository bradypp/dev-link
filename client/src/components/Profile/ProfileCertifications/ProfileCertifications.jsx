import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfileCertifications, selectIsCurrentUser } from 'redux/profile';
import { dateTime } from 'shared/utils';
import { Flex } from 'shared/components';
// import * as S from './ProfileCertificationsStyles';
import ProfileCertificationsForm from './ProfileCertificationsForm/ProfileCertificationsForm';

const propTypes = {
    certifications: PropTypes.array.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    certifications: selectProfileCertifications,
    isCurrentUser: selectIsCurrentUser,
});

const ProfileCertifications = ({ certifications, isCurrentUser }) => (
    <>
        {(certifications.length > 0 || isCurrentUser) && (
            <ProfileCard
                heading="Certifications"
                buttons={() =>
                    isCurrentUser && (
                        <ProfileCertificationsForm withAdd certifications={certifications} />
                    )
                }>
                {certifications.map((item, i) => {
                    const { title, issuer, date, description } = item;

                    return (
                        <ProfileCard.Item key={uuidv4()}>
                            <div>
                                <Flex justifyContent="space-between">
                                    <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                                    {isCurrentUser && (
                                        <ProfileCertificationsForm
                                            certifications={certifications}
                                            index={i}
                                        />
                                    )}
                                </Flex>
                                {issuer && (
                                    <ProfileCard.Item.Subtitle>{issuer}</ProfileCard.Item.Subtitle>
                                )}
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
        )}
    </>
);

ProfileCertifications.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileCertifications);
