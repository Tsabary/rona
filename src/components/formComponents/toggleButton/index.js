import "./styles.scss";
import React from "react";

const ToggleButton = ({ id, onChange, isChecked }) => {
  return (
    <div className="toggle-button">
      <input
        className="toggle-button__checkbox"
        type="checkbox"
        defaultChecked ={isChecked}
        id={id}
        onChange={() => onChange()}
      />
      <label className="toggle-button__label" htmlFor={id}>
        <div className="toggle-button__component" id="component" />
      </label>
    </div>
  );
};

export default ToggleButton;
