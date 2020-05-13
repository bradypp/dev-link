import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const CheckboxContainer = styled.div`
    position: relative;

    input {
        ${mixins.hideElement}
    }
`;

export const InputComponent = styled.input`
    ${mixins.hideElement}
`;

export const StyledLabel = styled.label`
    display: block;
    position: relative;
    margin: 0;
    margin-left: 2.8rem;
    padding: 0;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.textPrimary1};
    width: max-content;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.7;
        `}
`;
const backgroundColor = css`
    ${({ theme }) => theme.colors.background2}
`;
export const StyledCheckbox = styled.div`
    ${({ disabled }) => !disabled && mixins.clickable}
    position: absolute;
    display: block;
    margin: 0;
    margin-left: -2.8rem;
    border-radius: ${({ theme }) => theme.form.fieldBorderRadius};
    border: 1px solid ${({ theme }) => theme.colors.border3};
    /* box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border3} inset; */
    background-color: ${backgroundColor};
    background-clip: padding-box;
    padding: 0.2rem;
    content: '';
    height: 1.8rem;
    width: 1.8rem;
    transition: all 0.15s ease;
    top: 1px;
    svg {
        display:none;
        position: absolute;
    }
    
    ${({ checked }) =>
        checked &&
        css`
            background: ${({ theme }) => theme.colors.primary};
            border: 1px solid ${({ theme }) => theme.colors.primary};
            svg {
                display: inline-block;
                color: ${({ theme }) => theme.colors.white1};
                font-size: 0.9em;
            }
        `}
`;
