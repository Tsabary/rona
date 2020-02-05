import "./styles.scss";
import React, { useState, useEffect } from "react";
import ToggleButton from "../toggleButton";

const ToggleField = ({ text, toggleOn, toggleOff, isChecked = false }) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    checked ? toggleOn() : toggleOff();
  }, [checked]);

  return (
    <div className="toggle-field">
      <label className="toggle-button__label" htmlFor={text}>
        <div className="toggle-field__text">{text}</div>
      </label>
      <ToggleButton id={text} onChange={() => setChecked(!checked)} isChecked={checked} />
    </div>
  );
};

export default ToggleField;
