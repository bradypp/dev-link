import styled from 'styled-components/macro';
import { Icon } from 'shared/components';

// TODO: Create profile buttons (primary & edit)
export const ProfileContainer = styled.div`
    grid-column: 1 / 12;
    & > * {
        margin-bottom: ${({ theme }) => theme.layout.mainGridGap};
    }
`;

export const EditButton = styled(Icon).attrs({
    type: 'edit',
    size: '2.4rem',
})``;

export const EditIcon = styled(Icon).attrs({
    type: 'edit',
    size: '2.4rem',
})``;
