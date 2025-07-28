import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { Appcontext } from "../context/context";


function Jobcard({job}) {

    return ( 
        <div className="p-5 shadow border border-gray-400">
            <div className="">
                <img className="w-15 h-10 mb-1" src={job.companyid.image} alt="" />
            </div>
            <h4 className="font-medium"> {job.title} </h4>
            <div className="my-2 ">
                <span className="bg-blue-100  max-sm:text-xs rounded border-2 text-sm text-gray-600 border-blue-300 hover:border-blue-800 w-max px-2 py-1"> {job.location} </span>
                <span className="bg-red-100 max-sm:text-xs mx-1 rounded text-sm  text-gray-600 border-2 border-red-300 hover:border-red-700 w-max py-1 px-2"> {job.level} </span>
            </div >
            <div className="">
                <p className="text-gray-500 my-2 " dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
               
            </div>
                 <div>
                    <NavLink to={`/apply/${job._id}`} className="bg-blue-600 max-sm:text-xs rounded my-1 py-1 px-2 text-white">Apply now</NavLink>
                    <button className="border rounded border-gray-400 max-sm:text-xs px-2 py-1 mx-2">Learn more</button>
                </div>
        </div>
     );
}

export default Jobcard;