import styled, { css } from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';
import { mixins } from 'shared/styles';

const sharedStyles = css`
    margin-left: 0.75rem;
`;

export const StyledLink = styled(CustomLink)`
    ${sharedStyles}
`;

export const StyledButton = styled(Button)`
    ${sharedStyles}
`;

export const Logo = styled(CustomLink)`
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 3.5rem;
    padding: 0;
    font-weight: 400;
    margin-right: auto;
`;

export const StyledNav = styled.nav`
    ${mixins.flexBetween};
    padding: 1rem 0;
    width: 100%;
`;
