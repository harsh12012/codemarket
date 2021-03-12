import { useState, useEffect, useRef } from 'react';

export default function MyEditor({ data, setData, disabled }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    const { CKEditor } = require('@ckeditor/ckeditor5-react');
    editorRef.current = {
      CKEditor: CKEditor,
      ClassicEditor: require('@jgrayfibersmith/ckeditor5-build-classic-full-with-base64-upload')
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      disabled={disabled}
      onInit={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        setData(editor.getData());
      }}
    />
  ) : (
    <div>Editor loading</div>
  );
}
