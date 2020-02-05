import "./styles.scss";
import React from "react";

const IconOption = ({ id, onClick }) => {
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
        {/* <svg className="icon-option__icon">
          <use xlinkHref="./icons/ic1.svg#icon-1"></use>
        </svg> */}
        <img
          className="icon-option__icon"
          src="./icons/29.jpg"
          id="component"
        />
      </label>
    </div>
  );
};

export default IconOption;
