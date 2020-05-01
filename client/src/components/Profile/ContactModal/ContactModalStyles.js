import styled from 'styled-components/macro';
import { OutboundLink } from 'shared/components';

export const ItemContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.layout.itemGap};
`;

export const StyledOutboundLink = styled(OutboundLink)`
    display: inline-block;
`;
