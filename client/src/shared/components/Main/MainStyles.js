import styled, { css } from 'styled-components/macro';
import { mixins, media } from 'shared/styles';

const gridMainStyles = css`
    display: grid;
    grid-template-columns: repeat(16, minmax(min-content, 1fr));
    grid-gap: 1.6rem;
`;

const flexMainStyles = css`
    ${mixins.flexCenter};
    flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const MainContainer = styled.main`
    padding: 1.6rem ${({ theme }) => theme.layout.pagePadding};
    width: 100%;
    background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
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
    ${({ display }) =>
        (display === 'grid' && gridMainStyles) || (display === 'flex' && flexMainStyles)}};
`;
