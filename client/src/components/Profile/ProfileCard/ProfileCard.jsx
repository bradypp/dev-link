import React from 'react';
import PropTypes from 'prop-types';
import ProfileCardItem from './ProfileCardItem/ProfileCardItem';
import * as S from './ProfileCardStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    isCurrentUser: PropTypes.bool,
};

const defaultProps = {
    subtitle: undefined,
    className: undefined,
    isCurrentUser: false,
};

const ProfileCard = ({ children, isCurrentUser, heading, subtitle, ...otherProps }) => (
    <S.ProfileCardContainer {...otherProps}>
        <S.Header>
            <div>
                <S.Heading>{heading}</S.Heading>
                {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
            </div>
            {/* TODO: show edit button/icon here if the current auth user is on their profile */}
            {/* TODO: show add + button? */}
            {/* TODO: show a dotted border clickable section if empty & current user? */}
        </S.Header>
        {children}
    </S.ProfileCardContainer>
);

ProfileCard.Item = ProfileCardItem;

ProfileCard.propTypes = propTypes;
ProfileCard.defaultProps = defaultProps;

export default ProfileCard;
