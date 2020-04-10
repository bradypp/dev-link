import styled from 'styled-components/macro';
import {
    minimalButtonStyles,
    primaryButtonStyles,
    borderedButtonStyles,
} from 'shared/components/Button/ButtonVariantStyles';
import CustomLink from './CustomLink';

export const MinimalLink = styled(CustomLink)`
    ${minimalButtonStyles};
`;

export const PrimaryLink = styled(CustomLink)`
    ${primaryButtonStyles};
`;

export const BorderedLink = styled(CustomLink)`
    ${borderedButtonStyles};
`;
