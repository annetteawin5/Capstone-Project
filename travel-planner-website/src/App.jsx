import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage'
import Dashboardpage from './pages/Dashboardpage'




function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<Homepage  />} />
        <Route path="/destinations" element={<Dashboardpage />} />
        
     </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
