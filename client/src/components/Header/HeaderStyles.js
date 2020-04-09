import styled, { css } from 'styled-components/macro';
import { MinimalLink, PrimaryLink, BorderedLink, PrimaryButton } from 'shared/components';
import { mixins } from 'shared/styles';

// TODO: finalize header styling (change coloring)

const sharedStyles = css`
    margin-left: 1.4rem;
    font-size: 1.5rem;
    padding: 0 2rem;
    height: 3.8rem;
    border-radius: 5px;
`;

// TODO: Made header specific buttons?
export const StyledPrimaryLink = styled(PrimaryLink).attrs({
    color: 'primaryDark',
})`
    ${sharedStyles}
`;

export const StyledBorderedLink = styled(BorderedLink).attrs({
    color: 'primaryDark',
})`
    ${sharedStyles}
`;

export const StyledPrimaryButton = styled(PrimaryButton).attrs({
    color: 'primaryDark',
})`
    ${sharedStyles}
`;

export const Logo = styled(MinimalLink)`
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 3.5rem;
    padding: 0;
    font-weight: 400;
    margin-right: auto;
`;

export const NavContainer = styled.nav`
    ${mixins.containAndCenter}
    ${mixins.flexBetween}
`;

export const HeaderContainer = styled.header`
    box-shadow: ${({ theme }) => theme.boxShadow.card};
    padding: 1rem ${({ theme }) => theme.layout.pagePadding};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white1};
`;
