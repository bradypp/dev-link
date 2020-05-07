import styled from 'styled-components/macro';

export const ProfileContainer = styled.div`
    grid-column: 1 / -1;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }
`;
