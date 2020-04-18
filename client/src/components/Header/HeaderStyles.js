import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

// TODO: Made header specific buttons

export const HeaderStyles = styled.header`
    ${mixins.flexCenter}
    box-shadow: ${({ theme }) => theme.boxShadow.header};
    padding: 0 ${({ theme }) => theme.layout.pagePadding};
    height: ${({ theme }) => theme.layout.headerHeight};
    width: 100%;
    background: ${({ theme }) => theme.colors.background1};
    z-index: ${({ theme }) => theme.zIndex.header};

    .logo {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 3.5rem;
        padding: 0;
        font-weight: 400;
        margin-right: auto;
    }

    nav {
        ${mixins.containAndCenter}
        ${mixins.flexBetween}

        & > button, a:not(:first-child) {
            margin-left: 1.4rem;
            font-size: 1.5rem;
        }
    }
`;
