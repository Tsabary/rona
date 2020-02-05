import "./styles.scss";
import React, { useContext } from "react";
import SingleResult from "../singleResult";
import { SearchContext } from "../../../../providers/Search";
const data = require("../../../../data/set.json");

const Results = () => {
  const { searchTerm } = useContext(SearchContext);

  const renderTitles = () => {
    const titles = [
      "ID",
      "Name",
      "Email",
      "Gender",
      "Design Score",
      "Properties"
    ];

    return titles.map(title => {
      return (
        <div className="results__col-title" key={title}>
          {title}
        </div>
      );
    });
  };

  const renderResults = () => {
    const compare = (a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;

      return 0;
    };

    const filteredData = data.sort(compare).filter(result => {
      return result.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (!!filteredData.length) {
      return (
        <div>
          <div className="results__col-titles">{renderTitles()}</div>
          <div className="results__table">
            {filteredData.map(result => {
              return (
                <SingleResult
                  key={result.id}
                  searchTerm={searchTerm}
                  result={result}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="results__empty small-margin-top">no records found</div>
      );
    }
  };

  return <div className="results">{renderResults()}</div>;
};

export default Results;