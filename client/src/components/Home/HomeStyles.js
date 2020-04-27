import styled from 'styled-components/macro';
import { Form } from 'shared/components';

export const Heading = styled.h1`
    grid-column: 1 / 12;
    font-size: 5rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.textColored1};
`;

// TODO: Change to styled(Form) once you've made the form component
export const SearchContainer = styled.div`
    grid-column: 1 / 9;
`;

export const StyledInput = styled(Form.Field.Input).attrs({
    height: 5,
    fontSize: '2.5rem',
})`
    margin-bottom: 1rem;
`;
