import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

const Editor = ({
  value,
  onChange,
  name,
  setFieldValue,
  label = '',
  setDescription
}) => {
  return (
    <CKEditor
    name={name}
      editor={ClassicEditor}
      data={value}
      height={'8em'}
      onChange={(event, editor) => {
        const data = editor.getData();
        setDescription(data)
       
        setFieldValue(name, data);
      }}
    />
  );
};

export default Editor;