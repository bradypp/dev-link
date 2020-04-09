import styled from 'styled-components/macro';
import {
    minimalButtonStyles,
    primaryButtonStyles,
    borderedButtonStyles,
} from './ButtonVariantStyles';
import Button from './Button';

export const MinimalButton = styled(Button)`
    ${minimalButtonStyles};
`;

export const PrimaryButton = styled(Button)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const BorderedButton = styled(Button)`
    ${({ color }) => borderedButtonStyles(color)};
`;
