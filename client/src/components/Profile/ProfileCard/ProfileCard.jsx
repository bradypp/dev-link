import React from 'react';
import PropTypes from 'prop-types';
import * as S from './ProfileCardStyles';

const propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    isCurrentUser: PropTypes.bool,
};

const defaultProps = {
    subHeading: undefined,
    children: undefined,
    className: undefined,
    isCurrentUser: false,
};

const ProfileCard = ({ children, isCurrentUser, heading, subHeading, ...otherProps }) => (
    <S.StyledSection {...otherProps}>
        <S.Header>
            <div>
                <S.Heading>{heading}</S.Heading>
                {subHeading && <S.SubHeading>{subHeading}</S.SubHeading>}
            </div>
            {/* TODO: show edit button/icon here if the current auth user is on their profile */}
            {/* TODO: show add + button? */}
            {/* TODO: show a dotted border clickable section if empty & current user? */}
        </S.Header>
        {children}
    </S.StyledSection>
);

ProfileCard.propTypes = propTypes;
ProfileCard.defaultProps = defaultProps;

export default ProfileCard;
