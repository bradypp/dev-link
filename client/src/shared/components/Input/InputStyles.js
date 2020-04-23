import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const InputContainer = styled.div`
    position: relative;
    height: ${({ height }) => `${height}rem`};
    width: 100%;
    border-radius: 0.3rem;

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
    border-radius: 0.3rem;
    color: ${({ theme }) => theme.colors.textPrimary1};
    background-color: ${({ theme }) => theme.colors.background1};
    transition: background 0.1s;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ height }) => `${height / 2.4}rem`};
    padding-left: ${({ hasIcon, height }) => (hasIcon ? `${height}rem` : `${height / 4.5}rem`)};
    ${mixins.fieldHover}
    ${mixins.fieldFocus}
    ${mixins.fieldInvalid}
`;
