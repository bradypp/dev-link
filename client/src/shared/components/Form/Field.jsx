import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Field } from 'formik';
import { Input, TextArea, TextEditor, Select, Checkbox } from 'shared/components';
import { FieldContainer, FieldLabel, FieldTip, FieldError } from './FormStyles';

const propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
    submitOnChange: PropTypes.bool,
    type: PropTypes.string,
    width: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    name: undefined,
    submitOnChange: false,
    type: 'text',
    width: '100%',
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
        ...props
    }) => (
        <Field name={name} type={type}>
            {({ field, form, meta }) => {
                const fieldId = uniqueId('form-field-');

                const defaultField = (
                    <>
                        {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
                        <FormComponent
                            {...field}
                            {...props}
                            type={type}
                            id={fieldId}
                            invalid={meta.error && meta.touched}
                            onChange={value => {
                                form.setFieldValue(name, value);
                                if (submitOnChange) form.submitForm();
                            }}
                        />
                        {meta.error && meta.touched ? (
                            <FieldError>{meta.error}</FieldError>
                        ) : (
                            tip && <FieldTip>{tip}</FieldTip>
                        )}
                    </>
                );

                const checkboxField = (
                    <FormComponent
                        {...field}
                        {...props}
                        type={type}
                        label={label}
                        id={fieldId}
                        invalid={meta.error && meta.touched}
                        onChange={() => {
                            form.setFieldValue(name, !field.checked);
                            if (submitOnChange) form.submitForm();
                        }}
                    />
                );

                const fieldComponent = type === 'checkbox' ? checkboxField : defaultField;

                return (
                    <FieldContainer
                        className={className}
                        data-testid={name ? `form-field:${name}` : 'form-field'}
                        width={width}>
                        {fieldComponent}
                    </FieldContainer>
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

// TODO: delete
// const generateArrayField = FieldComponent => ({
//     className,
//     label,
//     tip,
//     submitOnChange,
//     name,
//     type,
//     values,
//     ...props
// }) => {
//     const fieldId = uniqueId('form-field-');
//     const fields =
//         values[name] &&
//         values[name].length > 0 &&
//         values[name].map((el, i) => {
//             return (
//                 <Field name={`${name}.${i}`} type={type}>
//                     {({ field, form, meta }) => {
//                         return (
//                             <FieldContainer
//                                 className={className}
//                                 data-testid={name ? `form-field:${name}-${i}` : 'form-field'}>
//                                 <FormComponent
//                                     {...field}
//                                     {...props}
//                                     type={type}
//                                     id={i === 0 ? fieldId : null}
//                                     invalid={meta.error && meta.touched}
//                                     onChange={value => {
//                                         form.setFieldValue(name, value);
//                                         if (submitOnChange) form.submitForm();
//                                     }}
//                                 />
//                                 {meta.error && meta.touched ? (
//                                     <FieldError>{meta.error}</FieldError>
//                                 ) : (
//                                     tip && <FieldTip>{tip}</FieldTip>
//                                 )}
//                             </FieldContainer>
//                         );
//                     }}
//                 </Field>
//             );
//         });
