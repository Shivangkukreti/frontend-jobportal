import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/context";
import "./style.css"

function Hero() {
let {search,setsearch,setisseached}=useContext(Appcontext)

// function handleall(event) {
//   const { name, value } = event.target;
//   setsearch(prev => ({
//     ...prev,
//     [name]: value
//   }));
// }

let titref=useRef(null)
let locref=useRef(null)

function onsch() {

  setsearch({
    title:titref.current.value,
    location:locref.current.value
  })
  setisseached(true)
}




    return (  
        <div className="container sm:px-5  my-10 mx-auto text-center ">


            <div className="bg-gradient-to-r  from-purple-800 to-purple-950 rounded-xl text-white py-10 px-5 mx-2 sm:mx-5">
                <h2 className="text-2xl md:text-3xl lg:text-4xl my-3 font-medium overflow-hidden whitespace-nowrap border-r w-fit mx-auto animate-typing ">Over 10,000+ jobs to apply</h2>
                <p className="max-w-lg mx-auto font-extralight m-4 text-sm ">Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
               
                <div className="flex justify-center w-fit   bg-white rounded p-1  text-black  mx-auto ">
                   
                    <div className="flex  items-center">
                       <img className="h-6 max-sm:hidden" src={assets.search_icon} alt="" />
                    <input className="max-md:text-xs max-sm:w-20  p-2 rounded   outline-none "  ref={titref} type="text" name="title"  placeholder=" jobs ?" />
                    </div>

                    <p className="text-center text-4xl font-extralight text-gray-500 sm:mx-5">|</p>

                    <div className="flex items-center ">
                       <img className="h-[50%] max-sm:hidden" src={assets.location_icon} alt="" />
                    <input className="max-md:text-xs p-2 rounded max-sm:w-20    outline-none " type="text" ref={locref} name="location" placeholder="Location ?" />
                    </div>
                    <button onClick={onsch} className="bg-blue-600 rounded max-sm:text-xs  py-2 px-4 text-white">Search</button>
                    </div>
             
                

            </div>

                <div className="flex flex-wrap gap-4 justify-evenly my-8 border-gray-200 border shadow-2xl p-4 rounded-2xl mx-5 ">
                    <p className="font-medium">Trusted By</p>
                    <img className="h-5 md:h-7" src={assets.amazon_logo} alt="" />
                    <img className="h-5 md:h-7" src={assets.adobe_logo} alt="" />
                    <img className="h-5 md:h-7" src={assets.walmart_logo} alt="" />
                    <img className="h-5 md:h-7" src={assets.accenture_logo} alt="" />
                    <img className="h-5 md:h-7" src={assets.samsung_logo} alt="" />
                    <img className="h-5 md:h-7" src={assets.microsoft_logo} alt="" />
                </div>







        </div>
    );
}

export default Hero;