import React from "react";
import NavBar from "../components/NavBar";
function Homepage(){
    return(
        <>
         <NavBar/>
         <div className="bg-[url('/src/assets/bg.jpg')] bg-cover bg-center p-15 h-screen" >
         
        <h1 className="text-3xl sm:text-lg md:text-2xl font-bold">Plan Your Next Adventure Today</h1>
        <p className="text-3xl sm:text-lg md:text-lg mt-4">Your Smart Companion  for planning unforgettable journeys</p>
        
       <div className="space-x-8 mt-10">
        <button className="bg-blue-500 text-white border-1 px-3 py-1 rounded-lg">Login</button>

         <button className="bg-blue-500 text-white border-1 px-2 py-1 rounded-lg ">SignUp</button>
        
       </div>
        
        
         </div>
        
        </>
       
    )
};
export default Homepage;