import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const FooterContainer = styled.footer`
    ${mixins.flexCenter}
    flex-wrap: wrap;
    padding-top: 2rem;
    height: ${({ theme }) => theme.layout.footerHeight};
`;

export const Separator = styled.span`
    margin: 0 0.6rem;
`;
