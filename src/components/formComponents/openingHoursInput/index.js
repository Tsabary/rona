import "./styles.scss";
import React, { useState, useEffect } from "react";
// import Dropdown from "react-dropdown";
import TimePicker from "react-time-picker";

const OpeningHours = ({ day, setOpening, currentOpening }) => {
  // const OpeningHours = ({ day, openingArray }) => {

  const [startTime, setStartTime] = useState("7:00");
  const [endTime, setEndTime] = useState("23:00");

  useEffect(() => {
    // openingArray.push
    setOpening({ ...currentOpening, [day]: [startTime, endTime] });
  }, [startTime, endTime]);

  return (
    <div className="opening-hours">
      <div className="opening-hours__day">{day}</div>
      <div className="opening-hours__pick">
        <TimePicker
          clockIcon={null}
          disableClock={true}
          clearIcon={null}
          value="7:30"
          maxDetail="minute"
          onChange={time => setStartTime(time)}
        />
      </div>
      <div className="opening-hours__pick">
        <TimePicker
          clockIcon={null}
          disableClock={true}
          clearIcon={null}
          value="23:30"
          maxDetail="minute"
          onChange={time => setEndTime(time)}
        />
      </div>
    </div>
  );
};

export default OpeningHours;
