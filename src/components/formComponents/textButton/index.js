import "./styles.scss";
import React from "react";

const TextButton = ({ text, children }) => {
  if (children) {
    return (
      <div className="text-button">
        {children}
      </div>
    );
  }
  return (
    <div className="text-button">
      {text}
    </div>
  );
};

export default TextButton;
