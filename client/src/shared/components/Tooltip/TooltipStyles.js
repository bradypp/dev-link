import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const TooltipContainer = styled.div`
    position: fixed;
    border-radius: 0.3rem;
    width: ${({ width }) => width || 'min-content'};
    padding: ${({ theme, padding }) => padding || theme.layout.cardPadding};
    z-index: ${({ theme }) => theme.zIndex.modal + 1};
    background: ${({ theme }) => theme.colors.background1};
    box-shadow: ${({ theme }) => theme.boxShadow.dropdown};
    ${mixins.hardwareAccelerate};
    ${({ position }) => css`
        ${position.top &&
            css`
                top: ${position.top};
            `};
        ${position.bottom &&
            css`
                bottom: ${position.bottom};
            `};
        ${position.left &&
            css`
                left: ${position.left};
            `};
        ${position.right &&
            css`
                right: ${position.right};
            `};
    `};
`;
