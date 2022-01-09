import React from "react";
import { useState, useContext, useEffect } from "react";
import moon from "../assets/moon.png";
import sun from "../assets/sun.png";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
import { GlobalStyles } from "../styles/globalStyles";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/contextApi";

export default function Header() {
  const { handleSetRegion, handleSearchValue, theme } =
    useContext(AppContext);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [pic, setPic] = useState();
  const navigate = useNavigate();
  const select = ["Europe", "Asia", "Africa", "Americas", "Oceania"];

  useEffect(() => {
    /*
    select.map((item, key) => {
      const selecte = (select[key].defaultValue = "DEFAULT");
    });
    */

    theme === "light" ? setPic(moon) : setPic(sun);
    theme === "light" ? setIsToggleOn(false) : setIsToggleOn(true);
  }, [theme]);

  const handleClick = () => {
    if (isToggleOn) {
      setPic(moon);
      localStorage.setItem("theme", "light");
    } else {
      setPic(sun);
      localStorage.setItem("theme", "dark");
    }

    setIsToggleOn(!isToggleOn);
    // handleTheme(!isToggleOn)
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(!Boolean(e.target.value.match(/[aA-zZ%^*#@!(){}[]]/g))){
      handleSearchValue(e.currentTarget.value);
      localStorage.setItem("search", e.currentTarget.value);
    }
 
    if (e.currentTarget.value.length > 0) {
      navigate("/search");
    } else {
      navigate("/");
    }
  };
  const handleSelect = (e, key) => {
    e.preventDefault();
    const regions = ["Europe", "Asia", "Africa", "Americas", "Oceania"];
    const region = e.currentTarget.value;
    //console.log(e.currentTarget.value)
    regions.includes(e.currentTarget.value)
      ? navigate(`/${region}`)
      : navigate("/");
    localStorage.setItem("region", e.currentTarget.value);
    handleSetRegion(e.currentTarget.value);
  };

  return (
    <div className="container">
      <div id="header">
        <Link
          to="/"
          onClick={() => {
            // localStorage.setItem("region", "all")
            return handleSetRegion("all");
          }}
        >
          <section id="title">
            <h1>Info Of World Countries</h1>
          </section>
        </Link>
        <section id="toggle">
          <ThemeProvider theme={isToggleOn ? darkTheme : lightTheme}>
            <GlobalStyles />
            <div className="container"></div>
          </ThemeProvider>
          <div id="#toggle " onClick={handleClick}>
            <img id="toggle-img" src={pic} alt="moon"></img>
            {/*<p>{this.state.isToggleOn ? "Light-Mode" : "Dark-Mode"}</p>}*/}
          </div>
        </section>
      </div>
      <div id="bottom-header">
        <section id="search">
          <input
            type="search"
            id="search"
            name="search"
            placeholder="search"
            onChange={handleSearch}
          />
        </section>
        <section id="select">
          <select name="Continents" id="Continents" defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled hidden>
              Filter By Region
            </option>
            {select.map((item, key) => {
              return (
                <option
                  key={key}
                  onClick={(e) => handleSelect(e)}
                  value={item}
                  ref={(ref) => (select[key] = ref)}
                >
                  {item}
                </option>
              );
            })}
          </select>
        </section>
      </div>
    </div>
  );
}
