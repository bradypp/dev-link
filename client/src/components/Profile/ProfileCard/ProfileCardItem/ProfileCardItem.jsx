import React from 'react';
import PropTypes from 'prop-types';
import * as S from './ProfileCardItemStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isCurrentUser: PropTypes.bool,
};

const defaultProps = {
    className: undefined,
    isCurrentUser: false,
};

const ProfileCardItem = ({ children, ...props }) => (
    <S.ProfileCardItemContainer {...props}>{children}</S.ProfileCardItemContainer>
);

ProfileCardItem.Heading = S.ItemHeading;
ProfileCardItem.Subtitle = S.ItemSubtitle;

ProfileCardItem.propTypes = propTypes;
ProfileCardItem.defaultProps = defaultProps;

export default ProfileCardItem;
