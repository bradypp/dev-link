import styled from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';

export const StyledLink = styled(CustomLink)`
    margin: 0 0.5rem;
`;

export const StyledButton = styled(Button)`
    margin: 0 0.5rem;
`;

export const Logo = styled(CustomLink)``;

export const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    width: 100%;
`;
