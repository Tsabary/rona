import "./styles.scss";
import React from "react";

const InputField = ({ placeHolder, onChange, value, label, type, isNumber }) => {

  const handleChange = string => {
    isNumber ? onChange(Number(string.replace(/\D/, ""))) : onChange(string);
  };


  return (
    <div className="input-field">
      <input
        className="input-field__input"
        id={placeHolder}
        type={type}
        placeholder={placeHolder}
        autoComplete="new-password"
        value={value || ""}
        onChange={e => handleChange(e.target.value)}
      ></input>
      <label htmlFor={placeHolder} className="input-field__label">
        {label}
      </label>
    </div>
  );
};

export default InputField;
