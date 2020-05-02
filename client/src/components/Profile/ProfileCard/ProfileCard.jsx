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
    buttons: PropTypes.func,
};

const defaultProps = {
    subtitle: undefined,
    className: undefined,
    isCurrentUser: false,
    buttons: undefined,
};

const ProfileCard = ({ children, isCurrentUser, heading, subtitle, buttons, ...props }) => (
    <S.ProfileCardContainer {...props}>
        <S.Header>
            <div>
                <S.Heading>{heading}</S.Heading>
                {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
            </div>
            {buttons && <S.ButtonsContainer>{buttons()}</S.ButtonsContainer>}
        </S.Header>
        {children}
    </S.ProfileCardContainer>
);

ProfileCard.Item = ProfileCardItem;

ProfileCard.propTypes = propTypes;
ProfileCard.defaultProps = defaultProps;

export default ProfileCard;
