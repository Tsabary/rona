import "./styles.scss";
import React from "react";

import { SearchProvider } from "../../../providers/Search";

import SearchInput from "./searchInput";
import SearchResults from "./searchResults";

const Tables = () => {
  return (
    <SearchProvider>
      <div className="search-page">
        {/* <div className="search-page__title">Search our database</div> */}
        <SearchInput />
        <SearchResults />
      </div>
    </SearchProvider>
  );
};

export default Tables;
