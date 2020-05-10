import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'shared/components';
import { ButtonsContainer } from './FormStyles';

const propTypes = {
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    withSubmit: PropTypes.bool,
    withReset: PropTypes.bool,
    withCancel: PropTypes.bool,
    onCancel: PropTypes.func,
    customButtons: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    submitText: PropTypes.string,
    resetText: PropTypes.string,
    cancelText: PropTypes.string,
    align: PropTypes.string,
};

const defaultProps = {
    className: PropTypes.string,
    withSubmit: true,
    withReset: false,
    withCancel: false,
    onCancel: () => {},
    customButtons: undefined,
    submitText: 'Submit',
    resetText: 'Reset',
    cancelText: 'Cancel',
    align: 'left',
};

const FormButtons = ({
    withSubmit,
    withReset,
    withCancel,
    onCancel,
    customButtons,
    submitText,
    resetText,
    cancelText,
    ...props
}) => {
    return (
        <ButtonsContainer {...props}>
            {withSubmit && <Button type="submit">{submitText}</Button>}
            {withReset && <Button type="reset">{resetText}</Button>}
            {withCancel && (
                <Button type="button" onClick={onCancel}>
                    {cancelText}
                </Button>
            )}
            {customButtons && customButtons}
        </ButtonsContainer>
    );
};

FormButtons.propTypes = propTypes;
FormButtons.defaultProps = defaultProps;

export default FormButtons;
