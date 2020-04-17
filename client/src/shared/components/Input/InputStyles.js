import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
    position: relative;
    height: ${({ height }) => `${height}rem`};
    width: 100%;
    border-radius: ${({ borderRadius }) => borderRadius};

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
    border: 0.1rem solid ${({ theme }) => theme.colors.border1};
    border-radius: ${({ borderRadius }) => borderRadius};
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
        border: 0.1rem solid ${({ theme }) => theme.colors.borderFocus};
        box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.colors.borderFocus};
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
