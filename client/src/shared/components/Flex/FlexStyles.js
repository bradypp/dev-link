import styled, { css } from 'styled-components/macro';

export const FlexContainer = styled.div`
    position: relative;
    display: flex;
    ${({ flexDirection, justifyContent, alignItems, flexWrap, alignContent }) => css`
        flex-direction: ${flexDirection};
        justify-content: ${justifyContent};
        align-items: ${alignItems};
        flex-wrap: ${flexWrap};
        align-content: ${alignContent};
    `}
`;
