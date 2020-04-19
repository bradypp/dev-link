import styled from 'styled-components/macro';
import { Spinner } from 'shared/components';
import ButtonWrapper from './ButtonWrapper';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
`;

export const ButtonSpinner = styled(Spinner).attrs({
    renderOverlay: false,
    variant: 'button',
    size: '1.8rem',
})``;

export const StyledButton = styled(ButtonWrapper)``;
