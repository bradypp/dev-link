import styled from 'styled-components/macro';
import { primaryButtonStyles, borderedButtonStyles } from 'shared/styles';
import { CustomLink } from 'shared/components';

export const PrimaryLink = styled(CustomLink)`
    ${({ color }) => primaryButtonStyles(color)};
`;

export const BorderedLink = styled(CustomLink)`
    ${({ color }) => borderedButtonStyles(color)};
`;
