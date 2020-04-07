import styled from 'styled-components/macro';
import { primaryButtonStyles, borderedButtonStyles } from './ButtonVariantStyles';
import Button from './Button';

export const PrimaryButton = styled(Button)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const BorderedButton = styled(Button)`
    ${({ color }) => borderedButtonStyles(color)};
`;
