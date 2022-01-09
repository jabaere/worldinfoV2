import React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/contextApi";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

export default function Search() {
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const { search, handleClickCountry } = useContext(AppContext);
  useEffect(() => {
    const search = localStorage.getItem("search");
    async function fetchData (){
     await fetch("https://restcountries.com/v3.1/name/" + search.toLowerCase())
      .then((res) => res.json())
      .then((data) => {
        
       if(data.length > 1){
        const data2 = data.filter(item=> item.name.common.toLowerCase() === search.toLowerCase())
        
        setData(data2);
       }else{
          
        setData(data);
       }
         
        data.status === 404 && setNotFound(true);
       
        //setData(data);

        //console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    fetchData()
   
  }, [search]);
  const handleSearchIndividual = (event) => {
    const CardIndex = event.target.getAttribute("alt");
    localStorage.setItem("country", CardIndex);
    handleClickCountry(CardIndex);
  };

  return data.length >= 1 ? (
    <div id="search-country">
      {data.map((country, index) => (
        <div key={index} id="all-country-li">
          <Link to={`/country/${country.name.common}`}>
            <img
              id="search-country-img"
              src={country.flags.png}
              data-index={index}
              onClick={handleSearchIndividual}
              alt={country.name.common}
            ></img>
            <h3 data-index={index} onClick={handleSearchIndividual} id="test">
              {country.name.common}
            </h3>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </Link>
        </div>
      ))}
    </div>
  ) : data.status === 404 || notFound ? (
    <h1>Not Found!</h1>
  ) : (
    <ReactLoading
      type={"spinningBubbles"}
      color={"#091236"}
      height={100}
      width={100}
      className="center"
    />
  );
}
