import styled, { css } from 'styled-components/macro';
import { FileUpload } from 'shared/components';

export const ImageUploadContainer = styled(FileUpload)`
    ${({ variant, isDragActive, theme }) =>
        variant === 'edit' &&
        css`
            svg {
                opacity: 0;
                color: ${theme.colors.white1};
                font-size: 3.6rem;
            }

            &:hover {
                svg {
                    transition: ${({ theme }) => theme.animation.basicTransition};
                    opacity: 0.5;
                }
            }

            ${isDragActive &&
                css`
                    border-color: ${theme.colors.primary};
                `}
        `}
`;
