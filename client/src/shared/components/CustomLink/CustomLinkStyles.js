import styled, { css } from 'styled-components/macro';
import { sharedButtonStyles, mixins } from 'shared/styles';
import {
    baseButtonStyles,
    primaryButtonStyles,
    borderedButtonStyles,
} from 'shared/components/Button/ButtonStyles';
import CustomLinkWrapper from './CustomLinkWrapper';

export const simpleLinkStyles = css`
    ${mixins.linkHover}
`;

export const StyledLink = styled(CustomLinkWrapper)`
    ${sharedButtonStyles};
    ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return primaryButtonStyles;
            case 'bordered':
                return borderedButtonStyles;
            case 'base':
                return baseButtonStyles;
            case 'link':
                return simpleLinkStyles;
            case 'no-style':
            default:
                return sharedButtonStyles;
        }
    }}
`;
