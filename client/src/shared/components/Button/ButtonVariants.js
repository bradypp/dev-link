import styled from 'styled-components/macro';
import { primaryButtonStyles, borderedButtonStyles } from 'shared/styles';
import Button from './Button';

export const PrimaryButton = styled(Button)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const BorderedButton = styled(Button)`
    ${({ color }) => borderedButtonStyles(color)};
`;
