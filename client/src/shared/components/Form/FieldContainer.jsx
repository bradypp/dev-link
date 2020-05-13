import React from 'react';
import PropTypes from 'prop-types';
import * as S from './FormStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.string,
    htmlFor: PropTypes.string,
    margin: PropTypes.string,
    tipLocation: PropTypes.oneOf(['above', 'below']),
    isError: PropTypes.bool,
};

const defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    name: undefined,
    type: 'text',
    width: '100%',
    htmlFor: undefined,
    margin: undefined,
    tipLocation: 'above',
    isError: false,
};

const FieldContainer = ({
    children,
    label,
    tip,
    name,
    htmlFor,
    tipLocation,
    isError,
    ...props
}) => (
    <S.FieldContainer data-testid={name ? `form-field:${name}` : 'form-field'} {...props}>
        {label && <S.FieldLabel htmlFor={htmlFor}>{label}</S.FieldLabel>}
        {tip && tipLocation === 'above' && <S.FieldTip tipLocation={tipLocation}>{tip}</S.FieldTip>}
        {children}
        {tip && tipLocation === 'below' && !isError && (
            <S.FieldTip tipLocation={tipLocation}>{tip}</S.FieldTip>
        )}
    </S.FieldContainer>
);

FieldContainer.propTypes = propTypes;
FieldContainer.defaultProps = defaultProps;

export default FieldContainer;
