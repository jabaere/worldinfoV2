import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import './App.css';
import Header from "../src/components/Header"
import Home from "../src/components/Home"
import Region from "../src/components/Region"
import Country from "../src/components/Country"
import Search from "../src/components/Search"
import { AppContextProvider } from "./context/contextApi"

function App() {
  return (
    <div className="App">
    <AppContextProvider>
      <Router>
          <Header/>
            <Routes >
              <Route exact path="/" element={<Home />}/>
             
           
              <Route path="/:region" element={<Region />}/>
                
          
              <Route path="/country/:country" element={<Country />}/>
         
              <Route path="/search" element={<Search />}/>
         
           
            </Routes >
          </Router>
          </AppContextProvider>
    </div>
  );
}

export default App;
