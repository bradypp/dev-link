import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'shared/components';
import { ButtonsContainer } from './FormStyles';

const propTypes = {
    withSubmit: PropTypes.bool,
    withReset: PropTypes.bool,
    withCancel: PropTypes.bool,
    onCancel: PropTypes.func,
    customButtons: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    submitText: PropTypes.string,
};

const defaultProps = {
    withSubmit: true,
    withReset: false,
    withCancel: false,
    onCancel: () => {},
    customButtons: undefined,
    submitText: 'Submit',
};

const FormButtons = ({
    withSubmit,
    withReset,
    withCancel,
    onCancel,
    customButtons,
    submitText,
    ...props
}) => {
    return (
        <ButtonsContainer {...props}>
            {withSubmit && <Button type="submit">{submitText}</Button>}
            {withReset && <Button type="reset">Reset</Button>}
            {withCancel && (
                <Button type="button" onClick={onCancel}>
                    Cancel
                </Button>
            )}
            {customButtons && customButtons}
        </ButtonsContainer>
    );
};

FormButtons.propTypes = propTypes;
FormButtons.defaultProps = defaultProps;

export default FormButtons;
