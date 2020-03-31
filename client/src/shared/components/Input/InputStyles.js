import styled, { css } from 'styled-components';

export const StyledInput = styled.div`
    position: relative;
    height: ${({ height }) => `${height}rem`};
    width: 100%;

    .icon {
        position: absolute;
        top: ${({ height }) => `${height / 4.2}rem`};
        left: ${({ height }) => `${height / 4.2}rem`};
        font-size: ${({ height }) => `${height / 1.8}rem`};
        pointer-events: none;
        color: ${({ theme }) => theme.colors.textPrimary1};
    }
`;

export const InputElement = styled.input`
    height: 100%;
    width: 100%;
    padding: 0 0.7rem;
    border-radius: ${({ borderRadius }) => borderRadius};
    border: 0.1rem solid ${({ theme }) => theme.colors.border1};
    color: ${({ theme }) => theme.colors.textPrimary1};
    background: ${({ theme }) => theme.colors.background1};
    transition: background 0.1s;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ height }) => `${height / 1.8}rem`};
    padding-left: ${({ hasIcon, height }) => (hasIcon ? `${height}rem` : `${height / 4.5}rem`)};

    &:hover {
        background: ${({ theme }) => theme.colors.background2};
    }

    &:focus {
        background: #fff;
        border: 0.1rem solid ${({ theme }) => theme.colors.borderInputFocus};
        box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.colors.borderInputFocus};
    }

    ${({ invalid, theme }) =>
        invalid &&
        css`
            &,
            &:focus {
                border: 0.1rem solid ${theme.colors.danger};
                box-shadow: none;
            }
        `}
`;
