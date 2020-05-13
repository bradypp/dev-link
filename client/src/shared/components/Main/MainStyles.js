import styled from 'styled-components/macro';
import { mixins, media } from 'shared/styles';

export const MainContainer = styled.main`
    padding: ${({ theme }) => `${theme.layout.mainGridGap} ${theme.layout.pagePadding}`};
    background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    width: 100%;
    min-height: calc(100vh - 15rem);

    ${media.bp800`
        padding: 1.6rem ${({ theme }) => theme.layout.pagePaddingTablet};
    `}
    ${media.bp440`
        padding: 1.6rem ${({ theme }) => theme.layout.pagePaddingMobile};
    `}
`;

export const LayoutContainer = styled.div`
    ${mixins.containAndCenter};
    ${({ columnNumber, theme }) => mixins.gridLayout(columnNumber, theme.layout.mainGridGap)};
`;
