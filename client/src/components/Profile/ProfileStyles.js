import styled from 'styled-components/macro';

export const ProfileContainer = styled.div`
    grid-column: 1 / 12;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }
`;
