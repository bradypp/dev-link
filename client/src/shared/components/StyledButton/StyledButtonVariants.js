import styled from 'styled-components/macro';
import {
    minimalButtonStyles,
    primaryButtonStyles,
    borderedButtonStyles,
} from './StyledButtonVariantStyles';
import StyledButton from './StyledButton';

export const MinimalButton = styled(StyledButton)`
    ${minimalButtonStyles};
`;

export const PrimaryButton = styled(StyledButton)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const BorderedButton = styled(StyledButton)`
    ${({ color }) => borderedButtonStyles(color)};
`;
