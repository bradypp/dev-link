import { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

// TODO: put box shadow on buttons
const lightenDarkenPercentage = 0.05;

export const primaryButtonStyles = (color = 'primary') => css`
    color: ${({ theme }) => {
        switch (color) {
            case 'primary':
            case 'primaryDark':
            case 'primaryLight':
            case 'secondary':
            case 'danger':
                return theme.colors.white1;
            default:
                return theme.colors.greyDark1;
        }
    }};
    background-color: ${({ theme }) => theme.colors[color]};
    &:not(:disabled) {
        &:hover {
            background-color: ${({ theme }) =>
                mixins.darken(theme.colors[color], lightenDarkenPercentage)};
        }
        &:active {
            background-color: ${({ theme }) =>
                mixins.lighten(theme.colors[color], lightenDarkenPercentage)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background-color: ${({ theme }) =>
                    mixins.lighten(theme.colors[color], lightenDarkenPercentage)} !important;
            `}
    }
`;

const borderedButtonActiveBackground = color => css`
    background-color: ${({ theme }) => mixins.rgba(theme.colors[color], 0.05)};
`;

export const borderedButtonStyles = (color = 'primary') => css`
    color: ${({ theme }) => theme.colors[color]};
    border: 1px solid ${({ theme }) => theme.colors[color]};
    &:not(:disabled) {
        &:not(:disabled) {
            &:hover {
                box-shadow: inset 0 0 0 0.1rem ${({ theme }) => theme.colors[color]};
                ${borderedButtonActiveBackground(color)};
            }
            &:active {
                box-shadow: inset 0 0 0 0.1rem ${({ theme }) => theme.colors[color]};
                ${borderedButtonActiveBackground(color)};
            }
            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 0.1rem ${({ theme }) => theme.colors[color]};
                    ${borderedButtonActiveBackground(color)};
                `}
        }
    }
`;
