import "./styles.scss";
import React from "react";
import { Link } from "react-router-dom";

const Position = ({ position }) => {
  return (
    <Link to={`/careers/${position.id}`} className="position">
      <div>
        <div className="position__title">{position.title}</div>
        <div className="position__location_and_type">
          {position.location} | {position.type}
        </div>
      </div>
      <div className="position__brief">{position.brief}</div>
      <div className="position__read-more">
        <div>Read More</div>
        <div>&rarr;</div>
      </div>
    </Link>
  );
};

export default Position;
