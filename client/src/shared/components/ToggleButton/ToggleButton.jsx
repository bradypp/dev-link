import React from 'react';
import PropTypes from 'prop-types';
import * as S from './ToggleButtonStyles';

const propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    icon: PropTypes.node,
};

const defaultProps = {
    icon: undefined,
};

const ToggleButton = ({ buttonText, count, ...props }) => {
    return (
        <>
            <S.ToggleButton {...props}>{buttonText}</S.ToggleButton>
            <S.CountContainer>{count}</S.CountContainer>
        </>
    );
};

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

export default ToggleButton;
