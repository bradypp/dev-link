import styled, { css } from 'styled-components/macro';

export const SpinnerOverlay = styled.div`
    ${({ overlayActive }) =>
        overlayActive &&
        css`
            height: 60vh;
            width: 100%;
        `}
    ${({ theme }) => theme.mixins.flexCenter}
`;

export const StyledSpinner = styled.div`
    display: inline-block;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    color: #636767;
    border: 5px solid #aaa;
    border-top-color: #666;
    animation: spin 1s ease-in-out infinite;

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
