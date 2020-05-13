import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Field, getIn } from 'formik';
import { Input, TextArea, TextEditor, Select, Checkbox } from 'shared/components';
import FieldContainer from './FieldContainer';
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
    tipLocation: PropTypes.oneOf(['above', 'below']),
    customOnChange: PropTypes.func,
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
    tipLocation: 'above',
    customOnChange: undefined,
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
        customOnChange,
        ...props
    }) => (
        <Field name={name} type={type}>
            {({ field, form }) => {
                const fieldId = propsId || uniqueId('form-field-');
                const error = getIn(form.errors, name);
                const touched = getIn(form.touched, name);

                const defaultField = (
                    <>
                        <FieldContainer
                            className={className}
                            data-testid={name ? `form-field:${name}` : 'form-field'}
                            width={width}
                            margin={margin}
                            name={name}
                            label={label}
                            tip={tip}
                            htmlFor={fieldId}
                            tipLocation={tipLocation}
                            isError={touched && error}
                            type={type}>
                            <FormComponent
                                {...field}
                                {...props}
                                type={type}
                                id={fieldId}
                                invalid={error && touched}
                                onChange={value => {
                                    form.setFieldValue(name, value);
                                    if (customOnChange) customOnChange(value);
                                    if (submitOnChange) form.submitForm();
                                }}
                            />
                            {touched && error && typeof error === 'string' && (
                                <S.FieldError>{error}</S.FieldError>
                            )}
                        </FieldContainer>
                    </>
                );

                const checkboxField = (
                    <FormComponent
                        {...field}
                        {...props}
                        className={className}
                        type={type}
                        label={label}
                        id={fieldId}
                        invalid={error && touched}
                        onChange={() => {
                            const value = !field.checked;
                            form.setFieldValue(name, value);
                            if (customOnChange) customOnChange(value);
                            if (submitOnChange) form.submitForm();
                        }}
                    />
                );

                return type === 'checkbox' ? checkboxField : defaultField;
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
