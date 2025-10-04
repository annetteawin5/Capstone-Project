import React from "react";
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/solid'
import { useState } from "react";

function NavBar() {
    const[isOpen, setIsOpen]=useState(false)
    return(

        <nav className="bg-white shadow-md  top-0 left-0 right-0 z-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center ">
            <div className="flex justify-between items-center h-16 ">
                <img className="w-10 h-10 object-contain" src={logo} alt="website logo" />    
            </div>
            <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                 <Link to="/destinations" className="hover:text-blue-600" >Destination</Link>
                <Link to="/itineraries" className="hover:text-blue-600" >Itineraries</Link>
                <Link to="/contact" className="hover:text-blue-600" >Contact</Link>
            </div>
            <div className="md:hidden ">
                {isOpen ? (
                    <XMarkIcon className="h-6 w-6 text-gray-800 cursor-pointer" onClick={() => setIsOpen(false)}/>
                ) : (
                    <Bars3Icon className="h-6 w-6 text-gray-800 cursor-pointer" onClick={() => setIsOpen(true)}/>
                )}
            </div>
            {isOpen && (
                <div  className=" absolute top-16 md:hidden flex flex-col space-y-4 mt-2 bg-white p-4 rounded-lg shadow-md ">
                 <Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
                 <Link to="/destinations" className="hover:text-blue-600" onClick={() => setIsOpen(false)} >Destination</Link>
                <Link to="/itineraries" className="hover:text-blue-600" onClick={() => setIsOpen(false)} >Itineraries</Link>
                <Link to="/contact" className="hover:text-blue-600" onClick={() => setIsOpen(false)} >Contact</Link>   
                </div>
            ) }
            
        </div>
        </nav>
    )
}
export default NavBar;