import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

const Card = styled.section`
    ${mixins.boxShadowCard};
    background-color: ${({ theme }) => theme.colors.background1};
    padding: 2.4rem;
    width: 100%;
`;

export default Card;
