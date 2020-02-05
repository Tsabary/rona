import React, { useState } from "react";

export const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};