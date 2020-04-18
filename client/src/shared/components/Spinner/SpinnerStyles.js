import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const SpinnerOverlay = styled.div`
    ${mixins.flexCenter}
    ${({ overlayActive }) =>
        overlayActive &&
        css`
            height: 60vh;
            width: 100%;
        `}
`;

// TODO: change styling for light/dark color
export const StyledSpinner = styled.div`
    display: inline-block;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 50%;
    border: ${({ variant }) =>
        (variant === 'default' && '0.4rem solid #ccc') ||
        (variant === 'button' && '0.25rem solid #ccc')};
    border-top-color: #666;
    animation: spin 1s ${({ theme }) => theme.animation.easeCustom} infinite;

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
`;
