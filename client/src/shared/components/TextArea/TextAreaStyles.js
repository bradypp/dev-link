import styled from 'styled-components';
import { mixins } from 'shared/styles';

export const TextAreaContainer = styled.div`
    display: inline-block;
    width: 100%;

    textarea {
        overflow-y: hidden;
        width: 100%;
        padding: 0.8rem 0.12rem 0.9rem;
        border-radius: 0.3rem;
        border: 0.1rem solid ${({ theme }) => theme.colors.border1};
        color: ${({ theme }) => theme.colors.textPrimary1};
        background-color: ${({ theme }) => theme.colors.background1};
        ${mixins.fieldHover}
    ${mixins.fieldFocus}
    ${mixins.fieldInvalid}
    }
`;
