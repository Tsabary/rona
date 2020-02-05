import "./styles.scss";
import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const DateInput = ({
  valueMonth,
  onChangeMonth,
  valueDay,
  onChangeDay
}) => {
  const monthOptions = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const dayOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31"
  ];


  return (
    <div className="date-input">
      <Dropdown
        options={monthOptions}
        onChange={selection => onChangeMonth(selection.value)}
        value={valueMonth || monthOptions[0]}
        placeholder="Month"
        baseClassName="date-input__component"
      />

      <Dropdown
        options={dayOptions}
        onChange={selection => onChangeDay(selection.value)}
        value={valueDay || dayOptions[0]}
        placeholder="Month"
        baseClassName="date-input__component"
      />


    </div>
  );
};

export default DateInput;
