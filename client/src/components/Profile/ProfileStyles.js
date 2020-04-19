import styled from 'styled-components/macro';

// TODO: Create profile buttons (primary & edit)
export const ProfileContainer = styled.div`
    grid-column: 1 / 11;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }
`;
