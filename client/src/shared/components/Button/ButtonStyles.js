import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const baseButtonStyles = css`
    ${mixins.inlineFlexCenter}
    vertical-align: middle;
    white-space: nowrap;
    appearance: none;
    overflow: hidden;
    position: relative;

    &:disabled {
        opacity: 0.7;
        cursor: default;
    }
`;

export const BaseButton = styled.button`
    ${baseButtonStyles};
`;
