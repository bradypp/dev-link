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

// TODO: add lighten & darken percentages as props?
const lightenDarkenPercentage = 0.1;

const primaryBackgroundBehaviour = (lightenOnHover = true) => css`
    background-color: ${({ theme, color }) => theme.colors[color]};
    &:not(:disabled) {
        &:hover {
            background-color: ${({ theme, color }) =>
                lightenOnHover
                    ? mixins.lighten(theme.colors[color], lightenDarkenPercentage)
                    : mixins.darken(theme.colors[color], lightenDarkenPercentage)};
        }
        &:active {
            background-color: ${({ theme, color }) =>
                lightenOnHover
                    ? mixins.darken(theme.colors[color], lightenDarkenPercentage)
                    : mixins.lighten(theme.colors[color], lightenDarkenPercentage)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background-color: ${({ theme, color }) =>
                    lightenOnHover
                        ? mixins.darken(theme.colors[color], lightenDarkenPercentage)
                        : mixins.lighten(theme.colors[color], lightenDarkenPercentage)} !important;
            `}
    }
`;

const primaryBackgroundColors = css`
    ${({ color }) => {
        switch (color) {
            case 'primary':
            case 'primaryDark':
            case 'primaryLight':
            case 'secondary':
            case 'danger':
                return primaryBackgroundBehaviour(true);
            default:
                return primaryBackgroundBehaviour(false);
        }
    }}
`;

export const primaryButtonStyles = css`
${minimalButtonStyles}
    color: ${({ theme, color }) => {
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
    ${primaryBackgroundColors}
`;

const borderedButtonActiveBackground = css`
    background-color: ${({ theme, color }) => mixins.rgba(theme.colors[color], 0.05)};
`;

export const borderedButtonStyles = css`
${minimalButtonStyles}
    color: ${({ theme, color }) => theme.colors[color]};
    border: 1px solid ${({ theme, color }) => theme.colors[color]};
    &:not(:disabled) {
        &:not(:disabled) {
            &:hover {
                box-shadow: inset 0 0 0 0.1rem ${({ theme, color }) => theme.colors[color]};
                ${borderedButtonActiveBackground};
            }
            &:active {
                box-shadow: inset 0 0 0 0.1rem ${({ theme, color }) => theme.colors[color]};
                ${borderedButtonActiveBackground};
            }
            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 0.1rem ${({ theme, color }) => theme.colors[color]};
                    ${borderedButtonActiveBackground};
                `}
        }
    }
`;
