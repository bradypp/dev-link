import styled from 'styled-components/macro';
import { buttonStyles } from 'shared/styles';
import OutboundLink from './OutboundLink';
import LinkWrapper from './LinkWrapper';

export const StyledLink = styled(LinkWrapper)`
    ${buttonStyles}
`;

export const StyledOutboundLink = styled(OutboundLink)`
    ${buttonStyles}
`;
