import React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/contextApi";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Region() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(undefined);
  const { region, handleClickCountry } = useContext(AppContext);
 
  useEffect(() => {
    const region2 = localStorage.getItem("region") || "all";

     function regionData() {
     fetch("https://restcountries.com/v3.1/region/" + region2)
      .then((res) => res.json())
      .then((data) => {
        
          setData(data);
          setIsLoading(true);
        //setRegion(region)
      });
    }
    function getAllData(){
      fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(true);
        // console.log(data)
      });
    }

    region2 === 'all' ? getAllData() : regionData()
  }, [region]);

  const indexHandler = (event) => {
    const CardIndex = event.currentTarget.getAttribute("alt");
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
              <div key={index} id="all-country-li">
                <Link to={`/country/${country.name.common}`}>
                  <img
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
              </div>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
