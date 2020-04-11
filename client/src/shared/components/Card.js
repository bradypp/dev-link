import styled from 'styled-components/macro';
import { Section } from 'shared/components';

const Card = styled(Section).attrs(({ padding }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: padding || '2.4rem',
}))`
    box-shadow: ${({ theme }) => theme.boxShadow.card};
    background-color: ${({ theme }) => theme.colors.background1};
    width: 100%;
`;

export default Card;
