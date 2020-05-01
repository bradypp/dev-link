import styled, { css } from 'styled-components/macro';

export const StyledDivider = styled.div`
    margin: ${({ margin, theme }) => margin || `0 0 ${theme.layout.itemGap}`};
    ${({ borderAlign, theme, borderColor }) =>
        borderAlign === 'vertical'
            ? css`
                  border-left: solid 1px ${theme.colors[borderColor]};
              `
            : css`
                  border-top: solid 1px ${theme.colors[borderColor]};
              `};
`;
