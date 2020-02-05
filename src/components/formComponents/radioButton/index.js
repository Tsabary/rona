import "./styles.scss";
import React from "react";

const RadioButton = ({ id, name, onChange, isChecked = false }) => {
  return (
    <div className="radio-button">
      <input
        className="radio-button__radio"
        id={id}
        type="radio"
        name={name}
        onChange={onChange}
        defaultChecked={isChecked}
      />
      <label htmlFor={id} className="radio-button__label">
        <span className="radio-button__button" id="component"></span>
      </label>
    </div>
  );
};

export default RadioButton;
