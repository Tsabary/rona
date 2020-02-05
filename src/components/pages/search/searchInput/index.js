import "./styles.scss";
import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";

import { SearchContext } from "../../../../providers/Search";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  useEffect(() => {
    setSearchTerm(Cookies.get("searchTerm") || "");
  }, []);

  const handleInputChange = value => {
    setSearchTerm(value);
    Cookies.set("searchTerm", value);
  };

  return (
    <div className="search">
      <input
        type="text"
        required
        className="search__input"
        placeholder="Search"
        onChange={e => handleInputChange(e.target.value)}
        value={searchTerm}
      />
      <svg
        className="search__icon search__icon--clear"
        onMouseDown={() => handleInputChange("")}
      >
        <use xlinkHref="./sprite.svg#icon-cross"></use>
      </svg>
      <svg className="search__icon search__icon--magnifying">
        <use xlinkHref="/sprite.svg#icon-magnifying-glass"></use>
      </svg>
    </div>
  );
};

export default SearchInput;