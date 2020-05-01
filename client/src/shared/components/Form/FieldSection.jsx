import React from 'react';
import PropTypes from 'prop-types';
import * as S from './FormStyles';

const propTypes = {
    children: PropTypes.number.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.string,
    fieldId: PropTypes.string,
    margin: PropTypes.string,
    tipLocation: PropTypes.oneOf(['top', 'bottom']),
};

const defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    name: undefined,
    type: 'text',
    width: '100%',
    fieldId: undefined,
    margin: undefined,
    tipLocation: 'top',
};

const FieldSection = ({ children, label, tip, name, fieldId, tipLocation, ...props }) => (
    <S.FieldContainer data-testid={name ? `form-field:${name}` : 'form-field'} {...props}>
        {label && <S.FieldLabel htmlFor={fieldId}>{label}</S.FieldLabel>}
        {tip && tipLocation === 'top' && <S.FieldTip tipLocation={tipLocation}>{tip}</S.FieldTip>}
        {children}
        {tip && tipLocation === 'bottom' && (
            <S.FieldTip tipLocation={tipLocation}>{tip}</S.FieldTip>
        )}
    </S.FieldContainer>
);

FieldSection.propTypes = propTypes;
FieldSection.defaultProps = defaultProps;

export default FieldSection;
