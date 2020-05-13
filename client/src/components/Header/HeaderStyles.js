import styled from 'styled-components/macro';
import { CustomLink, Button } from 'shared/components';
import { mixins } from 'shared/styles';

export const HeaderContainer = styled.header`
    ${mixins.flexCenter}
    /* box-shadow: ${({ theme }) => theme.boxShadow.header}; */
    border-bottom: 1px solid ${({ theme }) => theme.colors.border2};
    padding: 0 ${({ theme }) => theme.layout.pagePadding};
    height: ${({ theme }) => theme.layout.headerHeight};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white1};
    z-index: ${({ theme }) => theme.zIndex.header};
`;

export const NavContainer = styled.nav`
    ${mixins.containAndCenter}
    ${mixins.flexCenterBetween}
    height:100%;

    input {
        width: 40rem;

        &:focus {
            width: 42rem;
        }
    }
`;

export const NavLink = styled(CustomLink).attrs({
    iconSize: '1.8rem',
    variant: 'text-color',
})`
    border-radius: 0;
    padding: 0 0.5rem;
    margin: 0 1rem;
    height: 100%;
    margin: 0 0.8rem;
    font-weight: 500;
    font-size: 1.4rem;
`;

export const NavButton = styled(Button).attrs({
    iconSize: '1.8rem',
})`
    margin: 0 0.8rem;
    font-weight: 500;
    font-size: 1.5rem;
`;

export const LinksContainer = styled.div`
    ${mixins.flexCenter}
    height: 100%;
`;

export const Logo = styled(CustomLink)`
    color: ${({ theme }) => theme.colors.primaryDarker};
    font-size: 2.4rem;
    font-weight: 400;
    border-radius: 0.3rem;

    svg {
        font-size:3rem;
        /* color: ${({ theme }) => theme.colors.primary}; */
    }
`;
