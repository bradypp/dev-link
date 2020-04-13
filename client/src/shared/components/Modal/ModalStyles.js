import styled, { css } from 'styled-components';
import { Button } from 'shared/components';
import { mixins } from 'shared/styles';

// TODO: customize modal styling
export const ScrollOverlay = styled.div`
    z-index: ${({ theme }) => theme.zIndex.modal};
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    ${mixins.scrollableY}
`;

const clickOverlayStyles = {
    center: css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 50px;
    `,
    aside: '',
};

export const ClickableOverlay = styled.div`
    min-height: 100%;
    background: rgba(9, 30, 66, 0.54);
    ${({ variant }) => clickOverlayStyles[variant]}
`;

const modalStyles = {
    center: css`
        max-width: ${props => props.width}px;
        vertical-align: middle;
        border-radius: 3px;
        ${mixins.boxShadowMedium}
    `,
    aside: css`
        min-height: 100vh;
        max-width: ${props => props.width}px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
    `,
};

export const StyledModal = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    ${({ variant }) => modalStyles[variant]};
`;

const closeButtonStyles = {
    center: css`
        top: 10px;
        right: 12px;
        border-radius: 50%;
    `,
    aside: css`
        top: 10px;
        right: -30px;
        width: 5rem;
        height: 5rem;
        text-align: center;
        border: 1px solid ${({ theme }) => theme.colors.border1};
        ${mixins.boxShadowMedium};
        &:hover {
            color: ${({ theme }) => theme.colors.primary1};
        }
    `,
};

export const CloseButton = styled(Button).attrs(({ backgroundColor }) => ({
    textColor: 'textPrimary2',
    backgroundColor,
}))`
    position: absolute;
    font-size: 2.5rem;
    ${({ styles }) => closeButtonStyles[styles]}
`;
