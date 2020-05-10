import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ProfilesFormContainer = styled.section`
    ${mixins.flexCenterLeft}
    grid-column: 1 / -1;
    margin-bottom: 0.5rem 0;
`;
