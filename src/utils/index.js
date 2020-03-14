import React from "react";
import Highlighter from "react-highlight-words";

export const MyHighlight = ({ body, items, style }) => {
  return (
    <div className={style}>
      <Highlighter
        searchWords={[
          "burning man",
          "burning ban’s",
          "Black Rock City",
          "frothin’ Weirdo",
          "frothin’ Weirdos",
          "frothin’",
          "weirdos",
          "frothers",
          "leave no trace",
          "leave no trace!",
          ...items
        ]}
        autoEscape={true}
        textToHighlight={body}
        highlightClassName="bold-700"
        highlightStyle={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

export const multipleParagraphs = (array, style) => {
  return array.map(paragraph => {
    return (
      <MyHighlight
      key={paragraph.body}
        body={paragraph.body}
        items={paragraph.items}
        style={style}
      />
    );
  });
};


export const addLineBreaks = string =>
  string.split("|").map((text, index) => (
    <div key={`${text}-${index}`}>
      {text}
      <br />
    </div>
  ));
