import styled from 'styled-components/macro';
import { CustomLink } from 'shared/components';

export const ContentContainer = styled.div`
    button {
        margin-right: ${({ theme }) => theme.layout.buttonGap};
    }
`;

export const ItemContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.layout.itemGap};

    h2 {
        margin-bottom: 1rem;
    }
`;

export const StyledCustomLink = styled(CustomLink)`
    display: inline-block;
`;
