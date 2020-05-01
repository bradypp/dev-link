import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const UploadContainer = styled.div`
    text-align: center;
    width: 100%;
    ${mixins.flexColumnCenter}
    ${mixins.clickable}
    
    ${({ variant, isDragActive, theme }) =>
        variant === 'default' &&
        css`
            border: dashed 3px ${({ theme }) => theme.colors.border2};
            border-radius: 0.5rem;
            padding: 0.8rem;
            height: 22rem;

            svg {
                font-size: 4rem;
                margin-bottom: 1.6rem;
            }

            ${isDragActive &&
                css`
                    border-color: ${theme.colors.primary};
                `}
        `}

    ${({ variant, isDragActive, theme }) =>
        variant === 'hover' &&
        css`
            svg {
                font-size: 4rem;
                margin-bottom: 1.6rem;
            }

            ${isDragActive &&
                css`
                    border-color: ${theme.colors.primary};
                `}
        `}
`;
