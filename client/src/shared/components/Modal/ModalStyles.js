import styled, { css } from 'styled-components/macro';
import { Button } from 'shared/components';
import { mixins } from 'shared/styles';

export const ScrollOverlay = styled.div`
    ${mixins.scrollableY}
    z-index: ${({ theme }) => theme.zIndex.modal};
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
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
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.overlay};
    ${({ variant }) => clickOverlayStyles[variant]}
`;

const modalStyles = {
    center: css`
        ${mixins.boxShadowMedium}
        ${mixins.card}
        max-width: ${({ width }) => width || 'min-content'};
        vertical-align: middle;
        border-radius: 0.3rem;
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
    background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    ${({ variant }) => modalStyles[variant]};
`;

export const ButtonsContainer = styled.div`
    position: absolute;
    top: 1rem;
    right: 1.2rem;
    border-radius: 50%;

    & > * {
        margin-left: ${({ theme }) => theme.layout.buttonGap};
    }
`;

export const CloseButton = styled(Button).attrs(({ backgroundColor }) => ({
    backgroundColor,
}))`
    color: ${({ theme }) => theme.colors.textPrimary2};
    height: 3.2rem;
    width: 3.2rem;

    svg {
        font-size: 2.8rem;
    }
`;
