import styled from 'styled-components/macro';
import { flexStyles } from 'shared/styles';

export const FlexContainer = styled.div`
    ${flexStyles}
    padding: ${({ padding }) => padding};
    margin: ${({ margin }) => margin};
    width: 100%;
`;
