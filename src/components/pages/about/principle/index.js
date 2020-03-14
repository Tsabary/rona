import "./styles.scss";
import React from "react";
import { ReactSVG } from "react-svg";

import { addLineBreaks } from "../../../../utils";
const Principle = ({ principle }) => {
  const renderPath = () => {
    return `./ills/${principle.img}.svg`;
  };
  return (
    <div className="principle">
      <div className="principle__img">
        <ReactSVG src={renderPath()} />
      </div>
      <div className="principle__title centered small-margin-top">
        {principle.title}
      </div>
      <div className="principle__content centered-text small-margin-top">
        {addLineBreaks(principle.content)}
      </div>
    </div>
  );
};

export default Principle;
