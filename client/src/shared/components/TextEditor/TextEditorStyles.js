import styled from 'styled-components';

export const EditorContainer = styled.div`
    * {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.textPrimary1};
    }

    .ql-editor.ql-blank::before {
        color: ${({ theme }) => theme.colors.textPrimary1};
        opacity: 0.5;
        font-style: normal;
    }

    .ql-snow {
        border: 0.1rem solid ${({ theme }) => theme.colors.border2};
    }

    .ql-toolbar.ql-snow {
        border-radius: 0.4rem 0.4rem 0 0;
    }

    .ql-container.ql-snow {
        border-radius: 0 0 0.4rem 0.4rem;
        border-top: none;
    }

    .ql-editor {
        min-height: 110px;
    }
`;
