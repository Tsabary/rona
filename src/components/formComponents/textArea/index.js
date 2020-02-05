import "./styles.scss";
import React from "react";

const TextArea = ({ placeHolder, onChange, value, label, rows }) => {
  return (
    <div className="text-area">
      <textarea
        className="text-area__input"
        id={placeHolder}
        type="text"
        placeholder={placeHolder}
        autoComplete="new-password"
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        rows={rows}
      />
      <label htmlFor={placeHolder} className="text-area__label">
        {label}
      </label>
    </div>
  );
};

export default TextArea;