import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ProfileItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const SpinnerContainer = styled.div`
    ${mixins.flexCenter}
    min-height: 50vh;
`;
