import React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/contextApi";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Country() {
  const [isLoading, setIsLoading] = useState(undefined);
  const [data, setData] = useState([]);
  const { clickCountry, region } = useContext(AppContext);

  useEffect(() => {
    const country = localStorage.getItem("country").toLocaleLowerCase();

    fetch("https://restcountries.com/v3.1/name/" + country)
      .then((res) => res.json())
      .then((data) => {
        const data2 = data.filter(
          (country) => country.name.common === clickCountry
        );
        setData(data2);
        setIsLoading(true);
      });
  }, [clickCountry]);

  return (
    <div className="individual-card">
      {!isLoading ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#091236"}
          height={100}
          width={100}
          className="center"
        />
      ) : (
        data.map((country, index) => (
          <div key={index}>
            <div id="individual-card">
              <div id="individual-img">
                <div id="countryTittle">
                  <h2 id="test">{country.name.common}</h2>
                </div>
                <img
                  src={country.flags.png}
                  data-index={index}
                  alt={country.name.common}
                  id="ind-image"
                ></img>
                <div>
                  <Link to={region === "all" ? "/" : "/region"}>
                    <button>Back</button>
                  </Link>
                </div>
              </div>
              <div id="individual-country-info">
                <div>
                  <p>
                    <span className="titleText">Native Name:</span>{" "}
                    {/*country.name.nativeName.official*/}
                    {" "  + Object.values(country.name.nativeName).map(
                      (a) =>" "  + a.official  
                    )}
                  </p>
                  <p>
                    <span className="titleText">Population:</span>{" "}
                    {country.population}
                  </p>
                  <p>
                    <span className="titleText">Region:</span> {country.region}
                  </p>
                  <p>
                    <span className="titleText">Sub Region:</span>{" "}
                    {country.subregion}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="titleText">Capital: </span>
                    {country.capital ? country.capital[0] : ""}
                  </p>
                  <p>
                    <span className="titleText" key={index}>
                      Top Level Domain:
                    </span>{" "}
                    {country.tld.map((dom, index) => dom)}
                  </p>
                  <p>
                    <span className="titleText" key={index}>
                      Currencies:
                    </span>{" "}
                    {country.currencies
                      ? Object.values(country.currencies).map((a) => a.name)
                      : ""}
                  </p>
                  <p>
                    <span className="titleText" key={index}>
                      Currencie Symbol:
                    </span>{" "}
                    {country.currencies
                      ? Object.values(country.currencies).map((a) => a.symbol)
                      : ""}
                  </p>
                  <p>
                    {" "}
                    <span className="titleText" key={index}>
                      Languages:
                    </span>{" "}
                    {"  "  + Object.values(country.languages).map((a) => " "  + a)}
                  </p>
                </div>
              </div>
              <div className="border">
                {" "}
                <p className="titleText">Border Countries: </p>
                {country.borders
                  ? country.borders.map((border, index) => (
                      <div id="border" key={index}>
                        {border}
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
