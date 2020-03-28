import styled, { css } from 'styled-components/macro';
import { CustomLink, PrimaryLink, BorderedLink, PrimaryButton } from 'shared/components';
import { mixins } from 'shared/styles';

const sharedStyles = css`
    margin-left: 1rem;
`;

export const StyledPrimaryLink = styled(PrimaryLink).attrs(() => ({
    color: 'primaryDark',
}))`
    ${sharedStyles}
`;

export const StyledBorderedLink = styled(BorderedLink).attrs(() => ({
    color: 'primaryDark',
}))`
    ${sharedStyles}
`;

export const StyledPrimaryButton = styled(PrimaryButton).attrs(() => ({
    color: 'primaryDark',
}))`
    ${sharedStyles}
`;

export const Logo = styled(CustomLink)`
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 3.5rem;
    padding: 0;
    font-weight: 400;
    margin-right: auto;
`;

export const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mixins.containAndCenter}
`;

export const HeaderContainer = styled.header`
    padding: 1rem 0;
    width: 100%;
`;
