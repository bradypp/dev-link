import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const H2 = styled.h2`
    font-size: 2.2rem;
    font-weight: 400;
`;

export const H3 = styled.h3`
    font-size: 1.8rem;
`;

export const A = styled.a`
    ${mixins.link}
`;
