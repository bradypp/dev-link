import styled, { css } from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';

const sharedStyles = css`
    margin: 0 0.6rem;
    border-radius: 50px;
    font-size: ${({ theme }) => theme.fontSize.large};
    height: 4.5rem;
    padding: 0rem 2rem;
`;

export const StyledLink = styled(CustomLink)`
    ${sharedStyles}
`;

export const StyledButton = styled(Button)`
    ${sharedStyles}
`;

export const Logo = styled(CustomLink)`
    font-size: 4rem;
`;

export const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    width: 100%;
`;
