import styled from 'styled-components/macro';
import { CustomLink } from 'shared/components';
import { mixins } from 'shared/styles';

// TODO: Made header specific buttons

export const Logo = styled(CustomLink).attrs({
    variant: 'no-styles',
})`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3.5rem;
    padding: 0;
    font-weight: 400;
    margin-right: auto;
`;

export const NavContainer = styled.nav`
    ${mixins.containAndCenter}
    ${mixins.flexBetween}

    & > button, a:not(:first-child) {
        margin-left: 1.4rem;
        font-size: 1.5rem;
    }
`;

export const HeaderContainer = styled.header`
    ${mixins.flexCenter}
    box-shadow: ${({ theme }) => theme.boxShadow.header};
    padding: 0 ${({ theme }) => theme.layout.pagePadding};
    height: ${({ theme }) => theme.layout.headerHeight};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background1};
    z-index: ${({ theme }) => theme.zIndex.header};
`;
