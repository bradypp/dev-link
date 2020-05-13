import { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

const primaryDarken = css`
    background-color: ${({ theme, backgroundColor }) =>
        theme.colors[backgroundColor] || 'transparent'};
    ${({ theme, backgroundColor }) => mixins.darkenEffect(theme.colors[backgroundColor])}
`;

const primaryLighten = css`
    background-color: ${({ theme, backgroundColor }) =>
        theme.colors[backgroundColor] || 'transparent'};
    ${({ theme, backgroundColor }) => mixins.lightenEffect(theme.colors[backgroundColor])}
`;

const borderedFill = css`
    ${({ theme, borderColor, backgroundColor, color }) => {
        const hoverColor = backgroundColor || borderColor;
        return css`
            color: ${theme.colors[color || borderColor]};
            ${mixins.darkenEffect(
                theme.colors[hoverColor],
                theme.colors.white1,
                theme.colors[hoverColor],
            )}
        `;
    }}
`;

const borderedInset = css`
    ${({ theme, backgroundColor, borderColor, color }) =>
        css`
            transition: all 0.05s;
            color: ${theme.colors[color]};
            ${mixins.rgbaDarkenEffect(theme.colors[backgroundColor])};
            ${mixins.insetBorderEffect(theme.colors[borderColor])};
            ${({ theme }) => mixins.hoverEffect(null, theme.colors.primaryDark)}
        `}
`;

const iconOnlyHeightWidth = '3rem';

const buttonStyles = css`
    ${mixins.inlineFlexCenter}
    position: relative;

    svg {
        font-size: ${({ iconSize }) => iconSize || 'inherit'};
    }

    ${({ variant }) =>
        variant !== 'no-styles' &&
        css`
            font-size: 1.45rem;
            height: ${({ iconOnly }) => (iconOnly ? iconOnlyHeightWidth : '3.2rem')};
            width: ${({ iconOnly }) => (iconOnly ? iconOnlyHeightWidth : 'auto')};
            padding: 0 ${({ iconOnly }) => (iconOnly ? '0' : '1.2rem')};
            border-radius: ${({ iconOnly }) => (iconOnly ? '50%' : '0.3rem')};
            color: ${({ theme, color }) => theme.colors[color] || 'inherit'};
            border: ${({ borderColor, theme }) =>
                borderColor ? `1px solid ${theme.colors[borderColor]}` : 'none'};
        `}

    ${({ variant }) => {
        switch (variant) {
            case 'primary-darken':
                return primaryDarken;
            case 'primary-lighten':
                return primaryLighten;
            case 'bordered-fill':
                return borderedFill;
            case 'bordered-inset':
                return borderedInset;
            default:
                return null;
        }
    }}
`;

export default buttonStyles;
