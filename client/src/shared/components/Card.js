import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

const Card = styled.section`
    ${mixins.flexColumn}
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
    background: ${({ theme }) => theme.colors.background1};
    padding: 2.4rem;
    width: 100%;

    header {
        ${mixins.flexCenterBetween}
    }
`;

export default Card;
