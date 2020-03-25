import styled, { css } from 'styled-components/macro';

const StyledGridContainer = styled.div`
    display: grid;
    grid-template-columns: ${({ theme }) => {
        const gridWidth =
            (theme.layout.maxWidth / theme.layout.numberOfColumns) * theme.layout.gridGap;
        return css`
            [full-start] minmax(6rem, 1fr)[center-start]
                repeat(${theme.layout.numberOfColumns},
                    [col-start] minmax(min-content, ${gridWidth / theme.layout.numberOfColumns}rem)
                    [col-end]
                )
            [center-end] minmax(6rem, 1fr) [full-end]`;
    }};
    grid-gap: ${({ theme }) => theme.layout.gridGap}rem;
`;

export default StyledGridContainer;
