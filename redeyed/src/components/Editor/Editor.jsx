
  import React, { useState } from "react";
  import ReactQuill from "react-quill";
  import EditorToolbar, { modules, formats } from "./EditorToolbars";
  const Editor = ({
    setValue,
    errors,
    name,
    placeholder = "Write something awesome...",
    initialContent = "",
  }) => {
    const [content, setContent] = useState(initialContent);
    const editorStyle = {
      // maxheight: '500px',
      // minheight: '500px',
      height: "500px",
      // overFlow: 'auto',
  
      // set the height to 500 pixels
    };
    const onSetContent = (content) => {
      setContent(content);
      setValue(name, content);
    };
  
    return (
      <>
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(content) => onSetContent(content)}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          style={editorStyle}
        />
        {errors && errors?.content && (
          <p className="text-field-error italic text-red-500">
            {errors?.content?.message}
          </p>
        )}
      </>
    );
  };
  
  export default Editor;  
