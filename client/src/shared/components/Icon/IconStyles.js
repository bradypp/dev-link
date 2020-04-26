import styled, { css } from 'styled-components';
import { mixins } from 'shared/styles';

export const StyledIcon = Icon => styled(Icon)`
    display: inline-block;
    font-size: ${({ size }) => size};
    ${({ left, top }) => (left || top) && mixins.translate(left, top)};

    ${({ theme, color }) =>
        color &&
        css`
            color: ${theme.colors[color]};
        `};
`;
