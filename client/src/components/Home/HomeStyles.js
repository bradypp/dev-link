import styled from 'styled-components/macro';

export const Heading = styled.h1`
    grid-column: 1 / 10;
    font-size: 5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textColored1};
    margin: 3rem 0 5rem;
`;
