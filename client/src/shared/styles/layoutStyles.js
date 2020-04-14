import { css } from 'styled-components/macro';

export const gridStyles = css`
    display: grid;
    grid-template-columns: repeat(${({ gridColumns }) => gridColumns}, minmax(min-content, 1fr));
    grid-gap: ${({ gridGap }) => gridGap};
`;

export const flexStyles = css`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
    flex-direction: ${({ flexDirection }) => flexDirection};
    flex-wrap: ${({ flexWrap }) => flexWrap};
`;
