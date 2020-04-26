import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const InputContainer = styled.div`
    position: relative;
    height: ${({ height }) => `${height}rem`};
    width: 100%;
    border-radius: 0.3rem;

    svg {
        position: absolute;
        top: ${({ height }) => `${height / 4.2}rem`};
        left: ${({ height }) => `${height / 4.2}rem`};
        font-size: ${({ height }) => `${height / 1.8}rem`};
        pointer-events: none;
    }
`;

export const InputElement = styled.input`
    height: 100%;
    width: 100%;
    padding: 0 0.7rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.border2};
    border-radius: 0.3rem;
    color: ${({ theme, color }) => theme.colors[color]};
    background-color: ${({ theme }) => theme.colors.background2};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ fontSize }) => fontSize || `1.6rem`};
    padding-left: ${({ hasIcon, height }) => (hasIcon ? `${height}rem` : `${height / 4.5}rem`)};
    transition: all 0.1s;
    ${mixins.fieldHover}
    ${mixins.fieldFocus}
    ${mixins.fieldInvalid}
`;
