import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { useOnOutsideClick, useOnEscapeKeyDown } from 'shared/hooks';
import { Form } from 'shared/components';
import {
    ScrollOverlay,
    ClickableOverlay,
    StyledModal,
    CloseButton,
    ButtonsContainer,
} from './ModalStyles';

const propTypes = {
    className: PropTypes.string,
    testid: PropTypes.string,
    variant: PropTypes.string,
    width: PropTypes.string,
    withCloseButton: PropTypes.bool,
    withDeleteButton: PropTypes.bool,
    backgroundColor: PropTypes.string,
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    renderLink: PropTypes.func,
    renderContent: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    startOpen: PropTypes.bool,
};

const defaultProps = {
    className: undefined,
    testid: 'modal',
    variant: 'center',
    width: '80rem',
    withCloseButton: true,
    withDeleteButton: false,
    backgroundColor: 'background1',
    isOpen: undefined,
    onOpen: undefined,
    onClose: undefined,
    renderLink: undefined,
    onDelete: undefined,
    startOpen: false,
};

const Modal = ({
    className,
    testid,
    variant,
    width,
    withCloseButton,
    backgroundColor,
    isOpen: propsIsOpen,
    onOpen,
    onClose,
    renderLink,
    renderContent,
    onDelete,
    withDeleteButton,
    startOpen,
}) => {
    const [stateIsOpen, setStateOpen] = useState(startOpen || false);
    const isControlled = typeof propsIsOpen === 'boolean';
    const isOpen = isControlled ? propsIsOpen : stateIsOpen;

    const $modalRef = useRef();
    const $clickableOverlayRef = useRef();

    const closeModal = useCallback(() => {
        if (!isControlled) {
            setStateOpen(false);
        }
        if (onClose) onClose();
    }, [isControlled, onClose]);

    useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef);
    useOnEscapeKeyDown(isOpen, closeModal);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = 'visible';
            };
        }
    }, [isOpen]);

    return (
        <>
            {!isControlled && renderLink({ open: () => setStateOpen(true) })}
            {isOpen &&
                ReactDOM.createPortal(
                    <ScrollOverlay>
                        <ClickableOverlay variant={variant} ref={$clickableOverlayRef}>
                            <StyledModal
                                className={className}
                                variant={variant}
                                backgroundColor={backgroundColor}
                                width={width}
                                data-testid={testid}
                                ref={$modalRef}>
                                <ButtonsContainer>
                                    {withDeleteButton && (
                                        <Form.DeleteButton
                                            onClick={onDelete}
                                            backgroundColor={backgroundColor}
                                        />
                                    )}
                                    {withCloseButton && (
                                        <CloseButton
                                            onClick={closeModal}
                                            backgroundColor={backgroundColor}
                                            icon={<IoIosClose />}
                                        />
                                    )}
                                </ButtonsContainer>
                                {renderContent({ close: closeModal })}
                            </StyledModal>
                        </ClickableOverlay>
                    </ScrollOverlay>,
                    $root,
                )}
        </>
    );
};

const $root = document.getElementById('root');

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
