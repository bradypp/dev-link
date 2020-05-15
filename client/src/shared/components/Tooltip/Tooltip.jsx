import React, { useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useOnOutsideClick } from 'shared/hooks';
import { TooltipContainer } from './TooltipStyles';

const propTypes = {
    className: PropTypes.string,
    renderElement: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'bottomLeft', 'bottomRight', 'left']),
    offset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
    }),
    position: PropTypes.object,
    width: PropTypes.string,
    margin: PropTypes.number,
    padding: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    placement: 'bottom',
    offset: {
        top: 0,
        left: 0,
    },
    position: undefined,
    width: 'min-content',
    margin: 0,
    padding: undefined,
};

const calcPosition = (offset, placement, $tooltipRef, $linkRef, margin) => {
    const finalOffset = { ...defaultProps.offset, ...offset };

    const tooltipRect = $tooltipRef.current.getBoundingClientRect();
    const linkRect = $linkRef.current.getBoundingClientRect();
    const linkCenterY = linkRect.top + linkRect.height / 2;
    const linkCenterX = linkRect.left + linkRect.width / 2;

    const placements = {
        top: {
            top: linkRect.top - margin - tooltipRect.height,
            left: linkCenterX - tooltipRect.width / 2,
        },
        right: {
            top: linkCenterY - tooltipRect.height / 2,
            left: linkRect.right + margin,
        },
        bottom: {
            top: linkRect.bottom + margin,
            left: linkCenterX - tooltipRect.width / 2,
        },
        bottomLeft: {
            top: linkRect.bottom + margin,
            left: linkRect.right - tooltipRect.width,
        },
        bottomRight: {
            top: linkRect.bottom + margin,
            left: linkRect.left,
        },
        left: {
            top: linkCenterY - tooltipRect.height / 2,
            left: linkRect.left - margin - tooltipRect.width,
        },
    };
    return {
        top: `${placements[placement].top + finalOffset.top}px`,
        left: `${placements[placement].left + finalOffset.left}px`,
    };
};

const Tooltip = ({
    className,
    placement,
    offset,
    renderElement,
    renderContent,
    position: customPosition,
    margin,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({});

    const $linkRef = useRef();
    const $tooltipRef = useRef();

    const openTooltip = () => setIsOpen(true);
    const closeTooltip = () => setIsOpen(false);

    useOnOutsideClick([$tooltipRef, $linkRef], isOpen, closeTooltip);
    useLayoutEffect(() => {
        const setTooltipPosition = () => {
            if (customPosition) {
                setPosition(customPosition);
            } else {
                setPosition(calcPosition(offset, placement, $tooltipRef, $linkRef, margin));
            }
        };

        if (isOpen) {
            setTooltipPosition();
            window.addEventListener('resize', setTooltipPosition);
            window.addEventListener('scroll', setTooltipPosition);
        }

        return () => {
            window.removeEventListener('resize', setTooltipPosition);
            window.removeEventListener('scroll', setTooltipPosition);
        };
    }, [customPosition, isOpen, margin, offset, placement]);

    return (
        <>
            {renderElement({ ref: $linkRef, onClick: isOpen ? closeTooltip : openTooltip })}

            {isOpen &&
                ReactDOM.createPortal(
                    <TooltipContainer
                        className={className}
                        position={position}
                        ref={$tooltipRef}
                        {...props}>
                        {renderContent({ close: closeTooltip })}
                    </TooltipContainer>,
                    document.getElementById('root'),
                )}
        </>
    );
};

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
