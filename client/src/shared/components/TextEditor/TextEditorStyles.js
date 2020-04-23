import styled from 'styled-components';

export const EditorContainer = styled.div`
    .ql-toolbar.ql-snow {
        border-radius: 0.4rem 0.4rem 0 0;
        border: ${({ theme }) => theme.colors.border1};
        border-bottom: none;
    }
    .ql-container.ql-snow {
        border-radius: 0 0 0.4rem 0.4rem;
        border: ${({ theme }) => theme.colors.border1};
        border-top: none;
        color: ${({ theme }) => theme.colors.textPrimary1};
    }
    .ql-editor {
        min-height: 110px;
    }
`;
