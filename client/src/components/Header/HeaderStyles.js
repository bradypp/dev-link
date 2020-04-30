import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
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

    & > *:not(:first-child) {
        margin-left: 1.6rem;
    }
`;

export const Logo = styled(Link)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3.5rem;
    padding: 0;
    font-weight: 400;
`;

export const ClickableDiv = styled.div`
    ${mixins.flexCenter}
    ${mixins.clickable}
    position: relative;
    height: 100%;

    &:hover > :first-child {
        display: block;
    }
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
