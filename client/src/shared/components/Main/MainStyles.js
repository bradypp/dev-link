import styled, { css } from 'styled-components/macro';
import { mixins, media } from 'shared/styles';

export const MainContainer = styled.main`
    padding: 1.6rem ${({ theme }) => theme.layout.pagePadding};
    background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    width: 100%;
    min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});

    ${media.bp800`
        padding: 1.6rem ${({ theme }) => theme.layout.pagePaddingTablet};
    `}
    ${media.bp450`
        padding: 1.6rem ${({ theme }) => theme.layout.pagePaddingMobile};
    `}
`;

export const LayoutContainer = styled.div`
    ${mixins.containAndCenter};
    ${({ gridColumns }) => mixins.gridLayout(gridColumns, '1.6rem')};
`;
