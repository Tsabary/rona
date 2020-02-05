import "./styles.scss";
import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const TextEditor = ({ placeholder, onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = React.useRef(null);

  const handleChange = editorState => {
    setEditorState(editorState);
    let html = stateToHTML(editorState.getCurrentContent());
    onChange(html);
  };

  const toggleInlineStyle = event => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = event => {
    event.preventDefault();
    let block = event.currentTarget.getAttribute("data-block");
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const renderInlineStyleButton = () => {
    const inlineStyleButtons = [
      {
        value: "Bold",
        style: "BOLD"
      },

      {
        value: "Italic",
        style: "ITALIC"
      },

      {
        value: "Underline",
        style: "UNDERLINE"
      },
      {
        value: "Highlight",
        style: "HIGHLIGHT"
      },

      {
        value: "Froth Font",
        style: "FROTH_FONT"
      }
    ];

    return inlineStyleButtons.map(button => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      let className = "";
      if (currentInlineStyle.has(button.style)) {
        className = "active";
      }

      return (
        <input
          type="button"
          key={button.style}
          value={button.value}
          className={className}
          data-style={button.style}
          onMouseDown={toggleInlineStyle}
        />
      );
    });
  };

  const renderBlockButton = () => {
    const blockTypeButtons = [
      {
        value: "Heading One",
        block: "header-one"
      },

      {
        value: "Heading Two",
        block: "header-two"
      },

      {
        value: "Heading Three",
        block: "header-three"
      },

      {
        value: "Unordered List",
        block: "unordered-list-item"
      },

      {
        value: "Ordered List",
        block: "ordered-list-item"
      }
    ];
    return blockTypeButtons.map(button => {
      const currentBlockType = RichUtils.getCurrentBlockType(editorState);
      let className = "";
      if (currentBlockType === button.block) {
        className = "active";
      }

      return (
        <input
          type="button"
          key={button.block}
          value={button.value}
          className={className}
          data-block={button.block}
          onMouseDown={toggleBlockType}
        />
      );
    });
  };

  const handleKeyCommand = command => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);

    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }

    return "not-handled";
  };


  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: "#faed27"
    },
    FROTH_FONT: {
      fontFamily: "OutrunFuture"
    }
  };

  return (
    <div className="text-editor">
      <div className="text-editor__buttons tiny-margin-bottom">
        <div className="flex-group extra-tiny-margin-bottom">
          {renderBlockButton()}
        </div>
        <div className="flex-group"> {renderInlineStyleButton()}</div>
      </div>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        placeholder={placeholder}
        customStyleMap={styleMap}
      />
    </div>
  );
};

export default TextEditor;
