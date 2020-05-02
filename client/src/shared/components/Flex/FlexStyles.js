import styled, { css } from 'styled-components/macro';

export const FlexContainer = styled.div`
    display: flex;
    ${({ flexDirection, justifyContent, alignItems, flexWrap }) => css`
        flex-direction: ${flexDirection};
        justify-content: ${justifyContent};
        align-items: ${alignItems};
        flex-wrap: ${flexWrap};
    `}
`;
