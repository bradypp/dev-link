import styled from 'styled-components/macro';
import { buttonText, buttonStyles } from 'shared/styles';
import { Link } from 'react-router-dom';

export const Text = styled.span`
    ${buttonText}
`;

export const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colors.link};
    ${buttonStyles};
`;
