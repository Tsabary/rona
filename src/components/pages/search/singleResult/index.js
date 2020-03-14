import "./styles.scss";
import React from "react";
// import Highlight from "../highlight"; //that's my alternative solution but it has it's own issue
import ReactTooltip from "react-tooltip";
import { MyHighlight } from "../../../../utils";

const SingleResult = ({ searchTerm, result }) => {
  return (
    <div className="single-result">
      <div
        className="single-result__id single-result__column"
        data-tip
        data-for={result.id}
      >
        {result.id.substring(0, 7)}..
      </div>
      <ReactTooltip id={result.id} type="dark" effect="solid">
        {result.id}
      </ReactTooltip>

      <MyHighlight
        body={result.name}
        items={searchTerm}
        style="single-result__name single-result__column"
      />

      {/* <div className="single-result__name single-result__column">
        <Highlight source={result.name} target={searchTerm}>
          {s => (
            <span className="highlight" key={Math.random(1000)}>
              {s}
            </span>
          )}
        </Highlight>
      </div> */}
      <div className="single-result__column big-margin-left">
        {result.email}
      </div>
      <div className="single-result__column">{result.gender}</div>
      <div className="single-result__column">{result.design_score}</div>
      <div className="single-result__column">{result.properties_count}</div>
    </div>
  );
};

export default SingleResult;
