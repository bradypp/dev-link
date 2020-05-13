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
    variant: null,
})`
    border-radius: 0;
    margin: 0 1rem;
    height: 100%;
    font-weight: 500;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.primaryDarker};
    padding: 0 0.5rem;
    &:not(:last-of-type) {
        margin: 0 0.8rem;
    }

    &:hover {
        color: ${({ theme }) => mixins.lighten(theme.colors.primaryDarker, 0.4)};
    }

    svg {
        margin-right: 0.2rem;
    }
`;

export const NavButton = styled(Button).attrs({
    iconSize: '1.8rem',
})`
    margin: 0 0.8rem;
    font-weight: 500;
    font-size: 1.5rem;
    padding: 1.6rem 1.2rem;
`;

export const LinksContainer = styled.div`
    ${mixins.flexCenter}
    height: 100%;
`;

export const Logo = styled(CustomLink)`
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 2.6rem;
    font-weight: 400;
    border-radius: 0.3rem;

    svg {
        font-size: 3rem;
    }
`;
