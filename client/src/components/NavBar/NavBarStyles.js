import styled, { css } from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';
import { mixins, primaryButtonStyles, secondaryButtonStyles } from 'shared/styles';

const sharedStyles = css`
    margin-left: 1rem;
`;

export const PrimaryLink = styled(CustomLink).attrs(() => ({
    variant: 'primary',
    color: 'primaryDark',
}))`
    ${sharedStyles}
    ${primaryButtonStyles}
`;

export const SecondaryLink = styled(CustomLink).attrs(() => ({
    variant: 'secondary',
    color: 'primaryDark',
}))`
    ${sharedStyles}
    ${secondaryButtonStyles}
`;

export const PrimaryButton = styled(Button).attrs(() => ({
    variant: 'primary',
    color: 'primaryDark',
}))`
    ${sharedStyles}
    ${primaryButtonStyles}
`;

export const Logo = styled(CustomLink).attrs(() => ({
    variant: 'base',
}))`
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 3.5rem;
    padding: 0;
    font-weight: 400;
    margin-right: auto;
`;

export const StyledNav = styled.nav`
    ${({ theme }) => mixins.centerAndContain(theme.layout.maxWidth)};
    ${mixins.flexBetween};
    padding: 1rem 0;
    width: ${({ theme }) => theme.layout.maxWidth}rem;
`;
