import React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/contextApi";
import { Link } from "react-router-dom";

import ReactLoading from "react-loading";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(undefined);
  const { handleClickCountry } = useContext(AppContext);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(true);
        // console.log(data)
      });
  }, []);

  const indexHandler = (event) => {
    const CardIndex = event.target.getAttribute("alt");
    localStorage.setItem("country", CardIndex);
    handleClickCountry(CardIndex);
  };

  return (
    <section id="countries">
      <div className="card">
        {!isLoading ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={"#091236"}
            height={100}
            width={100}
            className="center"
          />
        ) : (
          <ul>
            {data.map((country, index) => (
              <li key={index} id="all-country-li">
                <Link to={`/country/${country.name.common}`}>
                  <img
                    id="all-countries"
                    src={country.flags.png}
                    data-index={index}
                    onClick={indexHandler}
                    alt={country.name.common}
                  ></img>
                  <h3 data-index={index} onClick={indexHandler} id="test">
                    {country.name.common}
                  </h3>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
