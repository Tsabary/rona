import "./styles.scss";
import React, { useEffect, useState } from "react";
import RadioButton from "../radioButton";
import InputField from "../inputField";

const RadioField = ({
  id,
  text,
  toggleOn,
  name,
  isChecked = false,
  label,
  value
}) => {
  const [checked, setChecked] = useState(isChecked);
  const [inputvalue, setInputValue] = useState("");

  const handelInputChange = val => {
    setInputValue(val);
    toggleOn(val);
  };

  const renderLabel = () => {
    switch (label) {
      case "staticText":
        return <div className="radio-field__text">{text}</div>;

      case "textInput":
        return (
          <InputField
            placeHolder={text}
            label={text}
            onChange={handelInputChange}
            value={inputvalue}
          />
        );

      case "numberInput":
        return (
          <InputField
            placeHolder={text}
            label={text}
            onChange={val => handelInputChange(val.replace(/\D/, ""))}
            value={inputvalue}
          />
        );
    }
  };

  return (
    <div className="radio-field">
      <label htmlFor={id} className="radio-field__label">
        <RadioButton
          id={id}
          name={name}
          onChange={() =>
            label === "staticText" ? toggleOn(value) : toggleOn(inputvalue)
          }
          isChecked={checked}
        />
        {renderLabel()}
      </label>
    </div>
  );
};

export default RadioField;
