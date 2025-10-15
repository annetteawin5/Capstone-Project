import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import TravelSearch from "./pages/TravelSearch";

function App() {
  return (
    <>
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travelsearch/" element={<TravelSearch/>} />
       
      </Routes>
    </>
  );
}

export default App;