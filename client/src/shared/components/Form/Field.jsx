import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Field as FormikField } from 'formik';
import { Input, TextArea, TextEditor } from 'shared/components';
import { FieldContainer, FieldLabel, FieldTip, FieldError } from './FormStyles';

const propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    error: undefined,
    name: undefined,
};

const generateField = FormComponent => {
    const FieldComponent = ({ className, label, tip, error, name, ...otherProps }) => {
        const fieldId = uniqueId('form-field-');

        return (
            <FieldContainer
                className={className}
                hasLabel={!!label}
                data-testid={name ? `form-field:${name}` : 'form-field'}>
                {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
                <FormComponent id={fieldId} invalid={!!error} name={name} {...otherProps} />
                {!error && tip && <FieldTip>{tip}</FieldTip>}
                {error && <FieldError>{error}</FieldError>}
            </FieldContainer>
        );
    };

    FieldComponent.propTypes = propTypes;
    FieldComponent.defaultProps = defaultProps;

    return FieldComponent;
};

// TODO: add the other fields (select, datepicker, checkbox)
export default {
    Input: generateField(Input),
    // Select: generateField(Select),
    TextArea: generateField(TextArea),
    TextEditor: generateField(TextEditor),
    // DatePicker: generateField(DatePicker),
};

// import React from 'react';
// import PropTypes from 'prop-types';
// import { uniqueId } from 'lodash';
// import { Field as FormikField } from 'formik';
// import { Input, TextArea, TextEditor } from 'shared/components';
// import { FieldContainer, FieldLabel, FieldTip, FieldError } from './FormStyles';

// const propTypes = {
//     className: PropTypes.string,
//     label: PropTypes.string,
//     tip: PropTypes.string,
//     validate: PropTypes.func,
//     name: PropTypes.string,
// };

// const defaultProps = {
//     className: undefined,
//     label: undefined,
//     tip: undefined,
//     validate: undefined,
//     name: undefined,
// };

// const generateField = FormComponent => {
//     const FieldComponent = ({ className, label, tip, name, validate, ...otherProps }) => (
//         <FormikField name={name} validate={validate}>
//             {({ field, form: { touched, errors, setFieldValue } }) => {
//                 const fieldId = uniqueId('form-field-');
//                 const errorMessage = touched[name] && errors[name];
//                 return (
//                     <FieldContainer
//                         className={className}
//                         hasLabel={!!label}
//                         data-testid={name ? `form-field:${name}` : 'form-field'}>
//                         {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
//                         <FormComponent
//                             {...field}
//                             id={fieldId}
//                             invalid={!!errorMessage}
//                             onChange={value => setFieldValue(name, value)}
//                             {...otherProps}
//                         />
//                         {!errorMessage && tip && <FieldTip>{tip}</FieldTip>}
//                         {errorMessage && <FieldError>{errorMessage}</FieldError>}
//                     </FieldContainer>
//                 );
//             }}
//         </FormikField>
//     );

//     FieldComponent.propTypes = propTypes;
//     FieldComponent.defaultProps = defaultProps;

//     return FieldComponent;
// };

// // TODO: add the other fields (select, datepicker, checkbox)
// export default {
//     Input: generateField(Input),
//     // Select: generateField(Select),
//     TextArea: generateField(TextArea),
//     TextEditor: generateField(TextEditor),
//     // DatePicker: generateField(DatePicker),
// };
