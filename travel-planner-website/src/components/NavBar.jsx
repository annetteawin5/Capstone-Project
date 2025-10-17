import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function NavBar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-blue-400">
             🌍 Travel Explorer
          </span>
        </div>

        </div>
      
    </nav>
  );
}

export default NavBar;