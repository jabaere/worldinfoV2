import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  let [region, setRegion] = useState(localStorage.getItem("region") || "all");
  let [search, setSearch] = useState(localStorage.getItem("search"));
  let [clickCountry, setClickCoutry] = useState(
    localStorage.getItem("country")
  );
  let [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const handleSetRegion = (inputValue) => {
    setRegion(inputValue);
  };
  const handleSearchValue = (value) => {
    setSearch(value);
  };

  const handleClickCountry = (country) => {
    setClickCoutry(country);
  };

  const handleTheme = (item) => {
    setTheme(item);
  };

  return (
    <AppContext.Provider
      value={{
        region,
        handleSetRegion,
        search,
        handleSearchValue,
        clickCountry,
        handleClickCountry,
        theme,
        handleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
