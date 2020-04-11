import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { sharedButtonStyles } from 'shared/styles';
import {
    baseButtonStyles,
    primaryButtonStyles,
    borderedButtonStyles,
} from 'shared/components/Button/ButtonStyles';

export const StyledLink = styled(Link)`
    ${sharedButtonStyles};
    ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return primaryButtonStyles;
            case 'bordered':
                return borderedButtonStyles;
            default:
                return baseButtonStyles;
        }
    }}
`;
