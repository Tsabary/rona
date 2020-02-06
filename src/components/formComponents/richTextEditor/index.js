import "./styles.scss";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Editor from "draft-js-plugins-editor";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import createHashtagPlugin from "draft-js-hashtag-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createInlineToolbarPlugin, {
  Separator
} from "draft-js-inline-toolbar-plugin";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import createDividerPlugin from "draft-js-divider-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createUndoPlugin from "draft-js-undo-plugin";

import "../../../../node_modules/draft-js-alignment-plugin/lib/plugin.css";
import "../../../../node_modules/draft-js-emoji-plugin/lib/plugin.css";
import "../../../../node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css";
import "../../../../node_modules/draft-js-mention-plugin/lib/plugin.css";
import "../../../../node_modules/draft-js-divider-plugin/lib/plugin.css";
import "../../../../node_modules/draft-js-undo-plugin/lib/plugin.css";
import "../../../../node_modules/draft-js-hashtag-plugin/lib/plugin.css";

import { fetchAllUsers } from "../../../actions";
import HeadlinesButton from "./headlinesButton";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton
} from "draft-js-buttons";

const linkifyPlugin = createLinkifyPlugin();
const hashtagPlugin = createHashtagPlugin();

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const dividerPlugin = createDividerPlugin(); /// doesn't work. Why?
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const linkPlugin = createLinkPlugin();
const { LinkButton } = linkPlugin; //can't integrate. Keep trying

const plugins = [
  linkifyPlugin,
  hashtagPlugin,
  emojiPlugin,
  inlineToolbarPlugin,
  mentionPlugin,
  dividerPlugin,
  undoPlugin,
  linkPlugin
];

const RichTextEditor = ({ onChange, users, fetchAllUsers }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState(users);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = editorState => {
    setEditorState(editorState);
    let html = stateToHTML(editorState.getCurrentContent());
    onChange(html);
  };

  const onSearchChange = ({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, users));
  };

  const onAddMention = () => {
    // get the mention object selected
  };

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__container tiny-margin-bottom">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          plugins={plugins}
        />
      </div>
      <EmojiSuggestions />

      <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        onAddMention={onAddMention}
      />
      <InlineToolbar>
        {// may be use React.Fragment instead of div to improve perfomance after React 16
        externalProps => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <Separator {...externalProps} />
            <HeadlinesButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
          </>
        )}
      </InlineToolbar>

      <EmojiSelect />
      <span className="tiny-margin-right" />
      <UndoButton />
      <span className="tiny-margin-right" />
      <RedoButton />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps, { fetchAllUsers })(RichTextEditor);
