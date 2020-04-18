import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';
import LinkWrapper from './LinkWrapper';

export const StyledLink = styled(LinkWrapper)`
    ${({ styledAsButton }) => styledAsButton && mixins.button}
`;
