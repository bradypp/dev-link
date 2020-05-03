import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ButtonsContainer = styled.div`
    ${mixins.flexCenterRight}
    & > *:not(:first-child) {
        margin-left: ${({ theme }) => theme.layout.buttonGap};
    }
`;
