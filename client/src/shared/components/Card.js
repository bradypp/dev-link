import styled from 'styled-components/macro';
import { Section } from 'shared/components';

const Card = styled(Section)`
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
    background: ${({ theme }) => theme.colors.background1};
    width: 100%;
`;

export default Card;
