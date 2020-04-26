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
        background-color: ${({ theme }) => theme.colors.background2};
        font-size: 1.5rem;
        min-height: 15rem;
        ${mixins.fieldHover}
        ${mixins.fieldFocus}
        ${mixins.fieldInvalid}
    }
`;
