import { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const minimalButtonStyles = css`
    color: ${({ theme }) => theme.colors.textPrimary1};
    font-weight: 600;
    height: 4rem;
    padding: 0 ${({ iconOnly }) => (!iconOnly ? `1.8rem` : `2.2rem`)};
    width: min-content;
    border-radius: 0.2rem;
`;

// TODO: put box shadow on buttons
const lightenDarkenPercentage = 0.05;

export const primaryButtonStyles = (color = 'primary') => css`
${minimalButtonStyles}
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
${minimalButtonStyles}
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
