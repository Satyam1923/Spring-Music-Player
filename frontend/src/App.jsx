import React, { useState, useEffect } from "react";
import {Routes,Route} from "react-router-dom";
import CurrApp from "./components/Currapp/Currapp";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
   
    return (
       <div className="custom-container">
              <Routes>
                <Route path="/" element={<CurrApp/>}/>
                <Route path="/home" element={<Home/>}/>

              </Routes>
       </div>
    );
};

export default App;
