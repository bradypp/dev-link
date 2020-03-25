import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

const gridSectionStyles = css`
    display: grid;
    grid-template-columns: ${({ theme, numberOfColumns, gridGap, maxWidth }) => {
        const gridWidth =
            ((maxWidth || theme.layout.maxWidth) / numberOfColumns) *
            (gridGap || theme.layout.gridGap);
        return css`
            [full-start] minmax(6rem, 1fr)[center-start]
                repeat(${numberOfColumns},
                    [col-start] minmax(min-content, ${gridWidth / numberOfColumns}rem)
                    [col-end]
                )
            [center-end] minmax(6rem, 1fr) [full-end]`;
    }};
    grid-gap: ${({ theme, gridGap }) => gridGap || theme.layout.gridGap}rem;
`;

const flexSectionStyles = css`
    ${({ theme, isContained, maxWidth }) =>
        isContained && mixins.centerAndContain(maxWidth || theme.layout.maxWidth)}
    ${mixins.flexCenter}
`;

const StyledSection = styled.section`
    ${({ layout }) =>
        (layout === 'grid' && gridSectionStyles) || (layout === 'flex' && flexSectionStyles)}
`;

export default StyledSection;
