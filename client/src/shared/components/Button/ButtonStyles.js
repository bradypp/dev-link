import styled, { css } from 'styled-components/macro';
import { Spinner } from 'shared/components';
import ButtonWrapper from './ButtonWrapper';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
`;

export const ButtonSpinner = styled(Spinner).attrs({
    overlayActive: false,
    variant: 'button',
    size: '1.8rem',
})``;

const textColor = css`
    color: ${({ theme, textColor, backgroundColor }) => {
        if (textColor) return theme.colors[textColor];
        switch (backgroundColor) {
            case 'buttonPrimary':
            case 'buttonDanger':
                return theme.colors.white1;
            default:
                return theme.colors.textPrimary1;
        }
    }};
`;

const baseButtonStyles = css`
    ${textColor};
    font-weight: 600;
    height: ${({ iconOnly }) => (iconOnly ? `2.8rem` : `3.6rem`)};
    width: ${({ iconOnly }) => iconOnly && `2.8rem`};
    padding: ${({ iconOnly }) => (iconOnly ? `0` : `0 1.6rem`)};
    border-radius: 0.2rem;
    background-color: ${({ theme, backgroundColor }) =>
        backgroundColor ? theme.colors[backgroundColor] : 'transparent'};
    border: ${({ theme, borderColor }) =>
        borderColor ? `1px solid ${theme.colors[borderColor]}` : 'none'};
`;

export const buttonStyles = css`
    ${baseButtonStyles}
`;

export const StyledButton = styled(ButtonWrapper)`
    ${buttonStyles}
`;
