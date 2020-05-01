import styled from 'styled-components/macro';
import { OutboundLink } from 'shared/components';

export const ItemContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.layout.itemGap};

    h2 {
        margin-bottom: 1rem;
    }
`;

export const StyledOutboundLink = styled(OutboundLink)`
    display: inline-block;
`;
