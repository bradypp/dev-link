import styled from 'styled-components/macro';
import { mixins, media } from 'shared/styles';

export const FooterContainer = styled.footer`
    ${mixins.flexCenter}
    flex-wrap: wrap;
    padding: 2rem ${({ theme }) => theme.layout.pagePadding} 0;
    height: ${({ theme }) => theme.layout.footerHeight};
    background-color: ${({ theme }) => theme.colors.background2};

    ${media.bp800`
        padding: 2rem ${({ theme }) => theme.layout.pagePaddingTablet} 0;
    `}
    ${media.bp440`
        padding: 2rem ${({ theme }) => theme.layout.pagePaddingMobile} 0;
    `};
`;

export const Separator = styled.span`
    margin: 0 0.6rem;
`;
