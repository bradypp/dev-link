import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Field, getIn } from 'formik';
import { Input, TextArea, TextEditor, Select, Checkbox } from 'shared/components';
import * as S from './FormStyles';

const propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
    submitOnChange: PropTypes.bool,
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
    submitOnChange: false,
    type: 'text',
    width: '100%',
    fieldId: undefined,
    margin: undefined,
    tipLocation: 'bottom',
};

const generateField = FormComponent => {
    const FieldComponent = ({
        className,
        label,
        tip,
        submitOnChange,
        name,
        type,
        width,
        fieldId: propsId,
        margin,
        tipLocation,
        ...props
    }) => (
        <Field name={name} type={type}>
            {({ field, form }) => {
                const fieldId = propsId || uniqueId('form-field-');
                const error = getIn(form.errors, name);
                const touched = getIn(form.touched, name);

                const defaultField = (
                    <>
                        {label && <S.FieldLabel htmlFor={fieldId}>{label}</S.FieldLabel>}
                        {tip && tipLocation === 'top' && (
                            <S.FieldTip tipLocation={tipLocation}>{tip}</S.FieldTip>
                        )}
                        <FormComponent
                            {...field}
                            {...props}
                            type={type}
                            id={fieldId}
                            invalid={error && touched}
                            onChange={value => {
                                form.setFieldValue(name, value);
                                if (submitOnChange) form.submitForm();
                            }}
                        />
                        {tip && tipLocation === 'bottom' && !error && (
                            <S.FieldTip tipLocation={tipLocation}>{tip}</S.FieldTip>
                        )}
                        {touched && error ? (
                            <S.FieldError className={className}>{error}</S.FieldError>
                        ) : null}
                    </>
                );

                const checkboxField = (
                    <FormComponent
                        {...field}
                        {...props}
                        type={type}
                        label={label}
                        id={fieldId}
                        invalid={error && touched}
                        onChange={() => {
                            form.setFieldValue(name, !field.checked);
                            if (submitOnChange) form.submitForm();
                        }}
                    />
                );

                const fieldComponent = type === 'checkbox' ? checkboxField : defaultField;

                return (
                    <S.FieldContainer
                        className={className}
                        data-testid={name ? `form-field:${name}` : 'form-field'}
                        width={width}
                        margin={margin}>
                        {fieldComponent}
                    </S.FieldContainer>
                );
            }}
        </Field>
    );

    FieldComponent.propTypes = propTypes;
    FieldComponent.defaultProps = defaultProps;

    return FieldComponent;
};

export default {
    Input: generateField(Input),
    Select: generateField(Select),
    TextArea: generateField(TextArea),
    TextEditor: generateField(TextEditor),
    Checkbox: generateField(Checkbox),
};
