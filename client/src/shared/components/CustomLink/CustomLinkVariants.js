import styled from 'styled-components/macro';
import { primaryButtonStyles, secondaryButtonStyles, borderedButtonStyles } from 'shared/styles';
import { CustomLink } from 'shared/components';

export const PrimaryLink = styled(CustomLink)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const SecondaryLink = styled(CustomLink)`
    ${({ color }) => secondaryButtonStyles(color)};
`;

export const BorderedLink = styled(CustomLink)`
    ${({ color }) => borderedButtonStyles(color)};
`;
