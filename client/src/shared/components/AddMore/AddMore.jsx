import React from 'react';
import PropTypes from 'prop-types';
import { IoIosAdd } from 'react-icons/io';
import { AddMoreContainer } from './AddMoreStyles';

const propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    fieldId: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    placeholder: 'Add more',
    fieldId: undefined,
};

const AddMore = ({ className, placeholder, fieldId, ...props }) => (
    <AddMoreContainer htmlFor={fieldId} {...props}>
        <IoIosAdd />
        {placeholder}
    </AddMoreContainer>
);

AddMore.propTypes = propTypes;
AddMore.defaultProps = defaultProps;

export default AddMore;
