import "./styles.scss";
import React from "react";

const BoxedButton = ({ text, action }) => {
  return (
    <div className="boxed-button" onClick={action}>
      {text}
    </div>
  );
};

export default BoxedButton;
