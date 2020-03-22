import styled, { css } from 'styled-components/macro';

export const SpinnerOverlay = styled.div`
    ${({ overlayActive }) =>
        overlayActive &&
        css`
            height: 60vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        `}
`;

export const StyledSpinner = styled.div`
    display: inline-block;
    width: ${({ size }) => (size === 'default' && 4.5) || (size === 'small' && 3)}rem;
    height: ${({ size }) => (size === 'default' && 4.5) || (size === 'small' && 3)}rem;
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
