import styled, { css } from 'styled-components/macro';
import {
    baseButtonStyles,
    primaryButtonStyles,
    secondaryButtonStyles,
    tertiaryButtonStyles,
} from 'shared/styles';
import { Link } from 'react-router-dom';

const sharedLinkStyles = css`
    color: ${({ theme }) => theme.colors.link};
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

export const SecondaryLink = styled(Link)`
    ${sharedLinkStyles}
    ${baseButtonStyles};
    ${secondaryButtonStyles};
`;

export const TertiaryLink = styled(Link)`
    ${sharedLinkStyles}
    ${baseButtonStyles};
    ${tertiaryButtonStyles};
`;
