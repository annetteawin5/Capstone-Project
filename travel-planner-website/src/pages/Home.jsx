import React from "react";
import NavBar from "../components/NavBar";
function Home(){
    return(
        <>
         <NavBar/>
         <div className="bg-[url('/src/assets/bg.jpg')] bg-cover bg-center p-15 h-screen" >
         
        <h1 className="text-3xl sm:text-lg md:text-2xl font-bold mt-30">Plan Your Next Adventure Today</h1>
        <p className="text-base sm:text-lg md:text-xl mb-10">Discover amazing destinations, flights, and hotels all in one place</p>
        
       <button className="px-5 py-2 sm:px-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg ">
        Get Started
       </button>
        
        
         </div>
        
        </>
       
    )
};
export default Home;