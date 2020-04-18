import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const FlexContainer = styled.div`
    ${mixins.flexStyles}
    padding: ${({ padding }) => padding};
    margin: ${({ margin }) => margin};
    width: 100%;
`;
