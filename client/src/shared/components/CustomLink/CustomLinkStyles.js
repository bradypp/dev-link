import styled, { css } from 'styled-components/macro';
import { baseButtonStyles, primaryButtonStyles, borderedButtonStyles } from 'shared/styles';
import { Link } from 'react-router-dom';

const sharedLinkStyles = css`
    color: ${({ theme }) => theme.colors.link};
    padding: 0 1.5rem;
`;

export const BaseLink = styled(Link)`
    ${sharedLinkStyles}
    ${baseButtonStyles};
`;

export const PrimaryLink = styled(Link)`
    ${sharedLinkStyles}
    ${baseButtonStyles};
    ${primaryButtonStyles};
`;

export const BorderedLink = styled(Link)`
    ${sharedLinkStyles}
    ${baseButtonStyles};
    ${borderedButtonStyles};
`;
