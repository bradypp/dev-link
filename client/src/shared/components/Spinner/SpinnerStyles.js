import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const SpinnerOverlay = styled.div`
    ${({ overlayActive }) =>
        overlayActive &&
        css`
            height: 60vh;
            width: 100%;
        `}
    ${mixins.flexCenter}
`;

export const StyledSpinner = styled.div`
    display: inline-block;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 50%;
    color: #636767;
    border: ${({ variant }) =>
        (variant === 'default' && '0.5rem solid #999') ||
        (variant === 'button' && '0.3rem solid #999')};
    border-top-color: #454545;
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
