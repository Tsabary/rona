import "./styles.scss";
import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const TimeInput = ({
  valueHour,
  onChangeHour,
  valueMinute,
  onChangeMinute,
  valueAmpm,
  onChangeAmpm
}) => {
  const handleTimeChange = (value, max, action) => {
    if (value.length <= 2) {
      value > max ? action(max) : action(value);
    }
  };

  const ampmOptions = ["AM", "PM"];

  return (
    <div className="time-input">
      <input
        className="time-input__input"
        id="time"
        type="text"
        pattern="[0-9]*"
        placeholder="hh"
        autoComplete="new-password"
        value={valueHour || ""}
        onChange={e =>
          handleTimeChange(e.target.value.replace(/\D/, ""), 12, onChangeHour)
        }
      />
      <div className="time-input__separator">:</div>
      <input
        className="time-input__input"
        id="time3"
        type="text"
        pattern="[0-9]*"
        placeholder="mm"
        autoComplete="new-password"
        value={valueMinute || ""}
        onChange={e =>
          handleTimeChange(e.target.value.replace(/\D/, ""), 59, onChangeMinute)
        }
      />

      <Dropdown
        options={ampmOptions}
        onChange={selection => onChangeAmpm(selection.value)}
        value={valueAmpm}
        placeholder="am/pm"
        baseClassName="date-input__component"
      />
    </div>
  );
};

export default TimeInput;
