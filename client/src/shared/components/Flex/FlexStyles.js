import styled, { css } from 'styled-components/macro';

export const FlexContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    ${({ flexDirection, justifyContent, alignItems, flexWrap, alignContent }) => css`
        flex-direction: ${flexDirection};
        justify-content: ${justifyContent};
        align-items: ${alignItems};
        flex-wrap: ${flexWrap};
        align-content: ${alignContent};
    `}
`;
