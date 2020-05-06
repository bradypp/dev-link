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
    variant: PropTypes.oneOf(['center', 'aside']),
    width: PropTypes.string,
    withCloseButton: PropTypes.bool,
    backgroundColor: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    renderLink: PropTypes.func,
    renderContent: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    testid: 'modal',
    variant: 'center',
    width: '80rem',
    withCloseButton: true,
    backgroundColor: 'background1',
    isOpen: undefined,
    onClose: () => {},
    renderLink: () => {},
    onDelete: undefined,
};

const Modal = ({
    className,
    testid,
    variant,
    width,
    withCloseButton,
    backgroundColor,
    isOpen: propsIsOpen,
    onClose: tellParentToClose,
    renderLink,
    renderContent,
    onDelete,
}) => {
    const [stateIsOpen, setStateOpen] = useState(false);
    const isControlled = typeof propsIsOpen === 'boolean';
    const isOpen = isControlled ? propsIsOpen : stateIsOpen;

    const $modalRef = useRef();
    const $clickableOverlayRef = useRef();

    const closeModal = useCallback(() => {
        if (!isControlled) {
            setStateOpen(false);
        } else {
            tellParentToClose();
        }
    }, [isControlled, tellParentToClose]);

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
                                    {onDelete && (
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
