import styled, { css } from 'styled-components/macro';
import { Spinner } from 'shared/components';
import { mixins } from 'shared/styles';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
    line-height: 0;
`;

export const StyledSpinner = styled(Spinner).attrs({
    overlayActive: false,
    variant: 'button',
    size: '1.8rem',
})`
    position: absolute;
`;

export const baseButtonStyles = css`
    ${mixins.inlineFlexCenter}
    vertical-align: middle;
    white-space: nowrap;
    appearance: none;
    overflow: hidden;

    &:disabled {
        opacity: 0.7;
        cursor: default;
    }
`;

export const BaseButton = styled.button`
    ${baseButtonStyles};
`;
