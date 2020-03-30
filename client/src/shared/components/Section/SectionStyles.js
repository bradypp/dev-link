import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

const gridSectionStyles = css`
    display: grid;
    grid-template-columns: repeat(16, [col-start] minmax(min-content, 1fr) [col-end]);
    grid-gap: 1rem;
`;

const flexSectionStyles = css`
    ${mixins.flexBetween}
`;

const StyledSection = styled.section`
    ${({ layout }) => {
        return (layout === 'grid' && gridSectionStyles) || (layout === 'flex' && flexSectionStyles);
    }}
    ${mixins.containAndCenter};
`;

export default StyledSection;
