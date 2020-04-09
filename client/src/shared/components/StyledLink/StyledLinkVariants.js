import styled from 'styled-components/macro';
import {
    minimalButtonStyles,
    primaryButtonStyles,
    borderedButtonStyles,
} from 'shared/components/StyledButton/StyledButtonVariantStyles';
import CustomLink from './StyledLink';

export const MinimalLink = styled(CustomLink)`
    ${minimalButtonStyles};
`;

export const PrimaryLink = styled(CustomLink)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const BorderedLink = styled(CustomLink)`
    ${({ color }) => borderedButtonStyles(color)};
`;
