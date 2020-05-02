import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const styleIcon = Icon => styled(Icon)`
    display: inline-block;
    font-size: ${({ size }) => size};
    ${({ left, top }) => (left || top) && mixins.translate(left, top)};
    color: ${({ theme, color }) => (color ? theme.colors[color] : 'currentColor')};
`;
