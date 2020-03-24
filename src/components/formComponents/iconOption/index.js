import "./styles.scss";
import React from "react";

const IconOption = ({ id, onClick, icon }) => {
  return (
    <div className="icon-option">
      <input
        className="icon-option__radio"
        id={id}
        type="radio"
        name="icons"
        onChange={onClick}
      />
      <label htmlFor={id} className="icon-option__label">
        <img
          className="icon-option__icon"
          src={`./imgs/${icon}`}
          id="component"
        />
      </label>
    </div>
  );
};

export default IconOption;
