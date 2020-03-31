import styled from 'styled-components/macro';
import { Input } from 'shared/components';

export const Heading = styled.h1`
    grid-column: 1 / 12;
    font-size: 5rem;
    font-weight: 300;
`;

export const SearchContainer = styled.div`
    grid-column: 1 / 9;
`;

export const InputContainer = styled.div``;

export const StyledInput = styled(Input).attrs({
    height: 5,
    borderRadius: `5rem`,
})``;
