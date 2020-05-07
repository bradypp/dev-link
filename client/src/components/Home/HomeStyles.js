import styled from 'styled-components/macro';
import { Form } from 'shared/components';

export const Heading = styled.h1`
    grid-column: 1 / 12;
    font-size: 5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textColored1};
    margin: 3rem 0 5rem;
`;

// TODO: Change to styled(Form) once you've made the form component
export const SearchContainer = styled.div`
    grid-column: 1 / 9;
`;

export const StyledInput = styled(Form.Field.Input).attrs({
    height: 5,
    fontSize: '2rem',
})`
    margin-bottom: 1rem;
    input {
        border-radius: 5rem;
    }
`;
