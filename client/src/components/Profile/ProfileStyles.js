import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ProfileContainer = styled.div`
    ${mixins.flexCenter};
    flex-direction: column;
    grid-column: 1 / 12;
    min-height: 60vh;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }
`;

export const SidebarContainer = styled.div`
    grid-column: 12 / -1;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }
`;
