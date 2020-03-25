import styled from 'styled-components/macro';
import { primaryButtonStyles, secondaryButtonStyles, borderedButtonStyles } from 'shared/styles';
import { CustomButton } from 'shared/components';

export const PrimaryButton = styled(CustomButton)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const SecondaryButton = styled(CustomButton)`
    ${({ color }) => secondaryButtonStyles(color)};
`;

export const BorderedButton = styled(CustomButton)`
    ${({ color }) => borderedButtonStyles(color)};
`;
