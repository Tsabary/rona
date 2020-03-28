import "./styles.scss";
import React from "react";

const BoxedButton = ({ text, action, children }) => {
  if (children) {
    return (
      <button type="submit" className="boxed-button">
        {children}
      </button>
    )
  }
  return (
    <div className="boxed-button" onClick={action}>
      {text}
    </div>
  );
};

export default BoxedButton;
