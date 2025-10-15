import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-blue-600">
            Travel Planner
          </span>
        </div>

        
        <div className="relative" ref={dropdownRef}>
          <Link to="/travelsearch">
          <button
           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Plan Your Trips
          </button>
          </Link>
          

          
            
          
        </div>
      </div>
    </nav>
  );
}

export default NavBar;