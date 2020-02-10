import "./styles.scss";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

///Editor and basic editor functionality imports///
import { EditorState } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";

import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

///emoji plugin and style imports///
import createEmojiPlugin from "draft-js-emoji-plugin";
import "../../../../node_modules/draft-js-emoji-plugin/lib/plugin.css";

///undo/redo plugin and style imports///
import createUndoPlugin from "draft-js-undo-plugin";
import "../../../../node_modules/draft-js-undo-plugin/lib/plugin.css";

///inline toolbar plugin and style imports. Also import the headline buttons and the other buttons to appear int the toolbar///
import createInlineToolbarPlugin, {
  Separator
} from "draft-js-inline-toolbar-plugin";
import "../../../../node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css";
import HeadlinesButton from "./headlinesButton";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton
} from "draft-js-buttons";

///focus plugin and style imports///
import createFocusPlugin from "draft-js-focus-plugin";
import "../../../../node_modules/draft-js-focus-plugin/lib/plugin.css";

///side bar plugin and style imports//
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import "../../../../node_modules/draft-js-side-toolbar-plugin/lib/plugin.css";

///divider plugin and style imports///
import createDividerPlugin from "draft-js-divider-plugin";
import "../../../../node_modules/draft-js-divider-plugin/lib/plugin.css";

///anchor plugin and style imports///
import createLinkPlugin from "draft-js-anchor-plugin";
import "../../../../node_modules/draft-js-anchor-plugin/lib/plugin.css";

import { fetchAllUsers } from "../../../actions";

///create the emoji plugin and extract it's components///
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

///create the undo/redo plugin and extract it's components///
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

///create the inline toolbar plugin and extract it's components///
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

///create the focus plugin///
const focusPlugin = createFocusPlugin();
const decorator = composeDecorators(focusPlugin.decorator);

///create the divider plugin and extract it's components///
const dividerPlugin = createDividerPlugin({ decorator });
const { DividerButton } = dividerPlugin;

///create the side tool bar plugin and extract it's components///
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

///create the anchor plugin///
const linkPlugin = createLinkPlugin();

const RichTextEditor = ({ onChange, value, users, fetchAllUsers }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (value) {
      setEditorState(EditorState.createWithContent(stateFromHTML(value)));
      onChange(value);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  const plugins = [
    emojiPlugin,
    undoPlugin,
    inlineToolbarPlugin,
    focusPlugin,
    dividerPlugin,
    sideToolbarPlugin,
    linkPlugin
  ];

  const handleChange = editorState => {
    setEditorState(editorState);
    let html = stateToHTML(editorState.getCurrentContent());
    onChange(html);
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

      <InlineToolbar>
        {externalProps => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <Separator {...externalProps} />
            <HeadlinesButton {...externalProps} />
            <Separator {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <Separator {...externalProps} />
            <linkPlugin.LinkButton {...externalProps} />
          </>
        )}
      </InlineToolbar>

      <SideToolbar>
        {externalProps => (
          <div>
            <DividerButton {...externalProps} />
          </div>
        )}
      </SideToolbar>

      <EmojiSuggestions />

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

///mention plugin and style imports///
// import createMentionPlugin, {
//   defaultSuggestionsFilter
// } from "draft-js-mention-plugin";
// import "../../../../node_modules/draft-js-mention-plugin/lib/plugin.css";
// import mentions from "./mentions";

// import createHashtagPlugin from "draft-js-hashtag-plugin";
// import "../../../../node_modules/draft-js-hashtag-plugin/lib/plugin.css";

// const mentionPlugin = createMentionPlugin({
//   // mentions,
//   mentionComponent: mentionProps => (
//     <span
//       className={mentionProps.className}
//       // eslint-disable-next-line no-alert
//       onClick={() => alert("Clicked on the Mention!")}
//     >
//       {mentionProps.children}
//     </span>
//   )
// });

// mentionPlugin
// hashtagPlugin,

// const mentionPlugin = createMentionPlugin();
// const { MentionSuggestions } = mentionPlugin;

// const hashtagPlugin = createHashtagPlugin();

// const [suggestions, setSuggestions] = useState(mentions);

// const mentionPlugin = createMentionPlugin({
//   mentions,
//   mentionComponent: mentionProps => (
//     <span
//       className={mentionProps.className}
//       // eslint-disable-next-line no-alert
//       onClick={() => alert("Clicked on the Mention!")}
//     >
//       {mentionProps.children}
//     </span>
//   )
// });
// const { MentionSuggestions } = mentionPlugin;

// useEffect(() => {
//   if (!!users.length) fetchAllUsers();
//   console.log(users);
// }, [users]);

// const onSearchChange = ({ value }) => {
//   setSuggestions(defaultSuggestionsFilter(value, mentions));
// };

// const onAddMention = () => {
//   // get the mention object selected
// };
{
  /* <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        onAddMention={onAddMention}
      /> */
}
