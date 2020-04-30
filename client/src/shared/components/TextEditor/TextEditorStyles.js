import styled from 'styled-components';

export const EditorContainer = styled.div`
    * {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: ${({ theme }) => theme.form.fontSize};
        color: ${({ theme }) => theme.colors.fieldText};
    }

    .ql-editor.ql-blank::before {
        color: ${({ theme }) => theme.colors.fieldText};
        opacity: 0.5;
        font-style: normal;
    }

    .ql-snow {
        border: 1px solid ${({ theme }) => theme.colors.fieldBorder};
    }

    .ql-toolbar.ql-snow {
        border-radius: ${({ theme }) =>
            `${theme.layout.fieldBorderRadius} ${theme.layout.fieldBorderRadius} 0 0`};
    }

    .ql-container.ql-snow {
        border-radius: ${({ theme }) =>
            `0 0 ${theme.layout.fieldBorderRadius} ${theme.layout.fieldBorderRadius}`};
        border-top: none;
    }

    .ql-editor {
        min-height: 110px;
    }
`;
