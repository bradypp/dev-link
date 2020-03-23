import styled, { css } from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';

const sharedStyles = css`
    margin: 0 0.5rem;
    padding: 1rem 2rem;
    font-size: ${({ theme }) => theme.fontSize.base};
`;

export const StyledLink = styled(CustomLink)`
    ${sharedStyles}
`;

export const StyledButton = styled(Button)`
    ${sharedStyles}
`;

export const Logo = styled(CustomLink)`
    padding: 2.5rem;
    font-size: ${({ theme }) => theme.fontSize.huge};
`;

export const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    width: 100%;
`;
