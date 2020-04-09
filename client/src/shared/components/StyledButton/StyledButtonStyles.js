import styled from 'styled-components/macro';
import { Spinner } from 'shared/components';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
`;

export const ButtonSpinner = styled(Spinner).attrs({
    overlayActive: false,
    variant: 'button',
    size: '1.8rem',
})``;
