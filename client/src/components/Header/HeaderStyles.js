import styled from 'styled-components/macro';
import { CustomLink } from 'shared/components';
import { mixins } from 'shared/styles';

// TODO: Made header specific buttons

export const HeaderContainer = styled.header`
    ${mixins.flexCenter}
    box-shadow: ${({ theme }) => theme.boxShadow.header};
    padding: 0 ${({ theme }) => theme.layout.pagePadding};
    height: ${({ theme }) => theme.layout.headerHeight};
    width: 100%;
    background: ${({ theme }) => theme.colors.background1};
    z-index: ${({ theme }) => theme.zIndex.header};
`;

export const NavContainer = styled.header`
    ${mixins.containAndCenter}
    ${mixins.flexCenterBetween}

    & > button, a:not(:first-child) {
        margin-left: 1.4rem;
        font-size: 1.5rem;
    }
`;

export const Logo = styled(CustomLink)`
        color: ${({ theme }) => theme.colors.primary};
        font-size: 3.5rem;
        padding: 0;
        font-weight: 400;
        margin-right: auto;
    }
`;
