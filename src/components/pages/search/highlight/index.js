import React from "react";

const highlightWord = (source, target, callback) => {
  if (!source) return res;
  if (!target) return source;

  const defaultHighlight = s => <em key={Math.random(1000)}>{s}</em>;
  const res = [];
  const regex = new RegExp(target, "gi");

  let lastOffset = 0;

  // Uses replace callback, but not its return value
  source.replace(regex, (val, offset) => {
    // Push both the last part of the string, and the new part with the highlight
    res.push(
      source.substr(lastOffset, offset - lastOffset),
      // Replace the string with JSX or anything.
      (callback || defaultHighlight)(val)
    );
    lastOffset = offset + val.length;
  });

  // Push the last non-highlighted string
  res.push(source.substr(lastOffset));
  return res;
};

const Highlight = ({ source, target, children }) =>
  highlightWord(source, target, children);

export default Highlight;