import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage'
import Destinationpage from './pages/Destinationpage'
import Itinerariespage from './pages/Itinerariespage'
import Contactpage from './pages/Contactpage'


function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<Homepage  />} />
        <Route path="/destinations" element={<Destinationpage />} />
        <Route path="/itineraries" element={<Itinerariespage />} />
        <Route path="/contact" element={<Contactpage />} />
     </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
