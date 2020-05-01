import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { useOnOutsideClick, useOnEscapeKeyDown } from 'shared/hooks';
import { ScrollOverlay, ClickableOverlay, StyledModal, CloseButton } from './ModalStyles';

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
    shouldRender: PropTypes.bool,
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
    shouldRender: undefined,
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
    shouldRender,
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

    useEffect(() => {
        if (shouldRender) setStateOpen(true);
    }, [shouldRender]);

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
                                {withCloseButton && (
                                    <CloseButton
                                        variant={variant}
                                        onClick={closeModal}
                                        backgroundColor={backgroundColor}
                                        icon={<IoIosClose />}
                                    />
                                )}
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
