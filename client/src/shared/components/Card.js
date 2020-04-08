import styled from 'styled-components/macro';

const Card = styled.section`
    box-shadow: ${({ theme }) => theme.boxShadow.card};
    background-color: ${({ theme }) => theme.colors.background1};
    padding: 2.4rem;
    width: 100%;
`;

export default Card;
