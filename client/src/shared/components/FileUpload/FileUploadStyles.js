import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const UploadContainer = styled.div`
    border: dashed 3px ${({ theme }) => theme.colors.border2};
    border-radius: 0.5rem;
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    text-align: center;
    padding: 0.8rem;
    ${mixins.flexColumnCenter}
    ${mixins.clickable}

    ${({ isDragActive, theme }) =>
        isDragActive &&
        css`
            border-color: ${theme.colors.primary};
        `}

    svg {
        font-size: 4rem;
        margin-bottom: 1.6rem;
    }
`;
