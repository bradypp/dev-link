import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { EditorContainer } from './TextEditorStyles';

const propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    getEditor: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    placeholder: undefined,
    defaultValue: undefined,
    value: undefined,
    onChange: () => {},
    getEditor: () => {},
};

const TextEditor = ({
    className,
    placeholder,
    defaultValue,
    value: defaultValue2,
    onChange,
    getEditor,
}) => {
    const $editorContainerRef = useRef();
    const $editorRef = useRef();

    // defaultValue is used to as the default value if given, otherwise, the default value is taken from the form field value prop
    const initialValueRef = useRef(defaultValue || defaultValue2 || '');

    const quillConfig = {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                ['clean'],
            ],
        },
    };

    useLayoutEffect(() => {
        let quill = new Quill($editorRef.current, { placeholder, ...quillConfig });

        const insertInitialValue = () => {
            quill.clipboard.dangerouslyPasteHTML(0, initialValueRef.current);
            quill.blur();
        };

        const handleContentsChange = () => {
            onChange(getHTMLValue());
        };

        const getHTMLValue = () =>
            $editorContainerRef.current.querySelector('.ql-editor').innerHTML;

        insertInitialValue();
        getEditor({ getValue: getHTMLValue });

        quill.on('text-change', handleContentsChange);
        return () => {
            quill.off('text-change', handleContentsChange);
            quill = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <EditorContainer className={className} ref={$editorContainerRef}>
            <div ref={$editorRef} />
        </EditorContainer>
    );
};

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;

export default TextEditor;
