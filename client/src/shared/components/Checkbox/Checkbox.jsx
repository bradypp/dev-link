import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
// import { Field } from 'formik';
import { FaCheck } from 'react-icons/fa';
import { CheckboxContainer, InputComponent, StyledLabel, StyledCheckbox } from './CheckboxStyles';

const propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.bool,
    checked: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    name: undefined,
    value: false,
    checked: false,
    type: 'checkbox',
    onChange: () => {},
};

const fieldId = uniqueId('form-field-');

const Checkbox = forwardRef(({ className, checked, onChange, label, ...props }, ref) => (
    <CheckboxContainer>
        <InputComponent
            {...props}
            id={fieldId}
            onChange={event => onChange(!!event.target.value, event)}
            ref={ref}
        />
        <StyledLabel htmlFor={fieldId}>
            <StyledCheckbox checked={checked}>
                <FaCheck />
            </StyledCheckbox>
            {label && label}
        </StyledLabel>
    </CheckboxContainer>
));

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;

// import React, { forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { uniqueId } from 'lodash';
// import { Field } from 'formik';
// import { FaCheck } from 'react-icons/fa';
// import { CheckboxContainer, InputComponent, StyledLabel, StyledCheckbox } from './CheckboxStyles';

// const propTypes = {
//     label: PropTypes.string.isRequired,
//     className: PropTypes.string,
//     name: PropTypes.string,
//     value: PropTypes.bool,
//     type: PropTypes.string,
//     onChange: PropTypes.func,
// };

// const defaultProps = {
//     className: undefined,
//     name: undefined,
//     value: false,
//     type: 'checkbox',
//     onChange: () => {},
// };

// const Checkbox = forwardRef(({ className, value, onChange, label, name, type, ...props }, ref) => (
//     <Field name={name} type={type}>
//         {({ field, form, meta }) => {
//             const fieldId = uniqueId('form-field-');
//             return (
//                 <CheckboxContainer
//                     className={className}
//                     hasLabel={!!label}
//                     data-testid={field.name ? `form-field:${field.name}` : 'form-field'}>
//                     <InputComponent
//                         {...field}
//                         {...props}
//                         type={type}
//                         id={fieldId}
//                         invalid={meta.error && meta.touched}
//                         onChange={() => form.setFieldValue(name, !field.checked)}
//                         ref={ref}
//                     />
//                     <StyledLabel htmlFor={fieldId}>
//                         <StyledCheckbox checked={field.checked}>
//                             <FaCheck />
//                         </StyledCheckbox>
//                         {label || 'checkbox'}
//                     </StyledLabel>
//                 </CheckboxContainer>
//             );
//         }}
//     </Field>
// ));

// Checkbox.propTypes = propTypes;
// Checkbox.defaultProps = defaultProps;

// export default Checkbox;
