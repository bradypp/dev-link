import styled from 'styled-components/macro';
import { CustomLink } from 'shared/components';
import { mixins } from 'shared/styles';

export const HeaderContainer = styled.header`
    ${mixins.flexCenter}
    box-shadow: ${({ theme }) => theme.boxShadow.header};
    padding: 0 ${({ theme }) => theme.layout.pagePadding};
    height: ${({ theme }) => theme.layout.headerHeight};
    width: 100%;
    background-color: #283e4a;
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

export const LinksContainer = styled.div`
    ${mixins.flexCenter}
    height: 100%;

    & > * {
        ${mixins.clickable}
        border-radius: 0;
        padding: 0 1.8rem;
        font-weight: 500;
        border-bottom: 2px solid transparent;
        height: 100%;

        &:hover {
            border-bottom: 2px solid #fff;
            & > * {
                color: ${({ theme }) => theme.colors.white1};
            }
        }
    }
`;

export const Logo = styled(CustomLink)`
    color: ${({ theme }) => theme.colors.white2};
    font-size: 2.4rem;
    font-weight: 400;
    border-radius: 0.3rem;
`;

export const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
`;
