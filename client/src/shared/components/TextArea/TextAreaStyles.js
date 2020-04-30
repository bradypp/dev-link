import styled from 'styled-components';
import { mixins } from 'shared/styles';

export const TextAreaContainer = styled.div`
    display: inline-block;
    width: 100%;
    
    textarea {
        overflow-y: hidden;
        padding: 0.8rem 0.12rem 0.9rem;
        min-height: ${({ height }) => `${height}rem !important`};
        width: 100%;
        font-family: ${({ theme }) => theme.fonts.primary};
        border-radius: ${({ theme }) => theme.form.fieldBorderRadius};
        border: 1px solid ${({ theme }) => theme.colors.fieldBorder};
        color: ${({ theme }) => theme.colors.fieldText};
        background-color: ${({ theme }) => theme.colors.fieldBackground};
        font-size: ${({ theme }) => theme.form.fontSize};
        ${mixins.fieldHover}
        ${mixins.fieldFocus}
        ${mixins.fieldInvalid}
    }
`;
