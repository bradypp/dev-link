import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';
import LinkWrapper from './LinkWrapper';

export const StyledLink = styled(LinkWrapper)`
    ${({ variant }) => variant === 'link' && mixins.link}
`;
