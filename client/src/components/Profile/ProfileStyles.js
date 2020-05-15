import styled from 'styled-components/macro';
import { media } from 'shared/styles';

export const ProfileContainer = styled.div`
    grid-column: 1 / 12;
    display: flex;
    flex-direction: column;
    min-height: 60vh;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }

    ${media.bp1040`
        grid-column: 1 / -1;
    `}
`;

export const SidebarContainer = styled.div`
    grid-column: 12 / -1;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }

    ${media.bp1040`
        grid-column: 1 / -1;
    `}
`;
