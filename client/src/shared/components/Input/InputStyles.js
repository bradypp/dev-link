import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const InputContainer = styled.div`
    position: relative;
    height: ${({ height }) => `${height}rem`};
    width: 100%;
    border-radius: ${({ theme }) => theme.form.fieldBorderRadius};
    svg {
        position: absolute;
        font-size: ${({ height }) => `${height / 1.8}rem`};
        pointer-events: none;
        ${({ iconLocation }) =>
            (iconLocation === 'left' &&
                css`
                    top: ${({ height }) => `${height / 4.2}rem`};
                    left: ${({ height }) => `${height / 4.2}rem`};
                `) ||
            (iconLocation === 'right' &&
                css`
                    top: ${({ height }) => `${height / 4.2}rem`};
                    right: ${({ height }) => `${height / 4.2}rem`};
                `)}
    }
`;

export const InputElement = styled.input`
    height: 100%;
    padding: ${({ hasIcon, iconLocation, height }) =>
        hasIcon
            ? css`
                  ${(iconLocation === 'left' && `0 0 0 ${height}rem`) ||
                      (iconLocation === 'right' && `0 ${height}rem 0 0.6rem`)};
              `
            : '0.6rem'};
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.primary};
    border-radius: ${({ theme }) => theme.form.fieldBorderRadius};
    border: 1px solid ${({ theme }) => theme.colors.fieldBorder};
    color: ${({ theme }) => theme.colors.fieldText};
    background-color: ${({ theme }) => theme.colors.fieldBackground};
    font-size: ${({ theme, fontSize }) => fontSize || theme.form.fontSize};
    ${mixins.fieldHover}
    ${mixins.fieldFocus}
    ${mixins.fieldInvalid}

`;
