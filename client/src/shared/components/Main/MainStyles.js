import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

const gridMainStyles = css`
    display: grid;
    grid-template-columns: repeat(16, minmax(min-content, 1fr));
    grid-gap: 1.6rem;
`;

const flexMainStyles = css`
    ${mixins.flexCenter};
    flex-direction: ${({ flexDirection }) => flexDirection};
`;

const MainContainer = styled.main`
    ${mixins.containAndCenter};
    ${({ display }) =>
        (display === 'grid' && gridMainStyles) || (display === 'flex' && flexMainStyles)}}
    padding
`;

export default MainContainer;
