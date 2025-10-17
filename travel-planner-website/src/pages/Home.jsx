import React from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleDownIcon} from '@heroicons/react/24/solid'
import NavBar from "../components/NavBar";
import About from '../components/About'
function Home(){
    return(
        <>
         <NavBar/>
         <div className="bg-[url('/src/assets/bg.jpg')]  h-[200px] bg-center p-15 h-screen" >
         
        <h1 className="text-3xl sm:text-lg md:text-2xl font-bold mt-30">Plan Your Next Adventure Today</h1>
        <p className="text-base sm:text-lg md:text-xl mb-10">Discover amazing destinations, flights, and hotels all in one place</p>
        
        
                 <Link to="/travelsearch">
                
                 <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                 > Plan Your Trips<ChevronDoubleDownIcon  className="h-4 w-8"/>
                  
                 </button>
                 </Link>
        
        <About/>
         </div>
        
        </>
       
    )
};
export default Home;