import "./styles.scss";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ReactSVG } from "react-svg";

import { fetchPositions } from "../../../actions";
import Position from "./position";

const Careers = ({ positions, fetchPositions }) => {
  useEffect(() => {
    fetchPositions();
  });

  const renderPositions = () => {
    return (
      <div className="careers__positions-feed">
        {positions.map(pos => {
          return <Position position={pos} />;
        })}
      </div>
    );
  };

  return (
    <div className="careers">
      <div className="careers__header">
        <div className="message-ill">
          <ReactSVG src="./ills/party.svg" />
        </div>

        <div className="careers__header-message">
          <div className="message-bold">Mondays are Awesome!</div>
          <div className="message-body">
            When you spend them with people you love.
          </div>
        </div>
      </div>
      <div className="careers__expanding">
        <div className="careers__header-message">
          <div className="message-bold">We're growing</div>
          <div className="message-body">
            And we are always looking for some superheroes to join our team.
          </div>
        </div>
        <div className="message-ill">
          <ReactSVG src="./ills/super_woman.svg" />
        </div>
      </div>

      <div className="careers__positions">
        <div className="centered">
          <h2>Open Positions</h2>
        </div>
        {positions.length
          ? renderPositions()
          : "There are no open positions at this time."}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    positions: state.positions
  };
};

export default connect(mapStateToProps, { fetchPositions })(Careers);
