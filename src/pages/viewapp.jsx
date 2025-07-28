import { useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { useContext } from "react";
import { Appcontext } from "../context/context";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Viewapp() {
let [allapp,setapp]=useState([])
let{api,companytoken}=useContext(Appcontext)

async function getapp() {
    try {
        
        let {data}=await axios.get(api+'/api/company/viewapplicants',{headers:{token:companytoken}})
        console.log(data.success);
        
    if (data.success) {
        console.log(data.all);
        setapp(data.all)
        
        
    }else{
        toast.error(data.message)
    }
    } catch (error) {
        toast.error(error.message)
    }
    
}

useEffect(()=>{
    if (companytoken) {
       getapp()  
    }
   
},[companytoken])



async function changestatus(id,status) {
    try {

    let {data}=await axios.post(api+'/api/company/changestatus',{id,status},{headers:{token:companytoken}})
    if (data.success) {
        toast.success(data.message)
    }  
    } catch (error) {
        toast.error(error.message)
    }
  
}


    return ( 
        <div className="container md:px-10 mx-auto" >
            <table className="min-w-full border rounded border-gray-200 shadow mt-10 ">
                <thead >
                    <tr>
                        <th className="p-2 max-md:text-xs max-md:hidden border-b border-gray-300 shadow">#</th>
                        <th className="p-2 w-fit max-md:text-xs border-b border-gray-300 shadow">Username</th>
                        <th className="p-2 max-md:text-xs max-sm:hidden border-b border-gray-300 shadow">Job Title</th>
                        <th className="p-2 max-md:text-xs border-b max-md:hidden border-gray-300 shadow">Location</th>
                        <th className="p-2 max-md:text-xs border-b border-gray-300 shadow">Resume</th>
                        <th className="p-2 max-md:text-xs border-b border-gray-300 shadow">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allapp.map((any,idx)=>{
                        return(
                            <tr key={idx} className="">
                                <td className="p-2 max-md:text-xs max-md:hidden border-b border-gray-200 text-center">  {idx+1} </td>
                                <td className="p-2 w-fit max-md:text-xs border-b border-gray-200 text-center flex items-center"> <img className="w-10 mx-4 max-sm:hidden" src={any.userinfo.image} alt="" />{any.userinfo.name} </td>
                                <td className="p-2 max-md:text-xs max-sm:hidden border-b border-gray-200 text-center"> {any.jobid.title} </td>
                                <td className="p-2 max-md:text-xs max-md:hidden border-b border-gray-200 text-center"> {any.jobid.location} </td>
                                <td className="p-2 max-md:text-xs border-b border-gray-200 text-center">
                                    <NavLink to={any.userinfo.resume}>
                                    <span className="text-blue-700 cursor-pointer px-2 w-fit py-1 mx-auto gap-1 rounded bg-blue-200 b flex items-center">
                                        Resume <img src={assets.resume_download_icon} alt="" /></span> </NavLink>
                                     </td>
                                <td className="p-2 max-md:text-xs border-b border-gray-200 text-center">
                                    {any.status=='Pending'? <span className="relative group font-bold cursor-pointer">. . .
                                        <div className="absolute top-5 z-10 hidden group-hover:block">
                                            <ul className="border  border-gray-200 bg-white   shadow">
                                                <li onClick={()=>changestatus(any._id,"Accept")} className="border-b hover:bg-gray-100 text-green-600   border-gray-300 px-2 py-1">Accept</li>
                                                <li onClick={()=>changestatus(any._id,"Reject")} className="py-1 px-2 hover:bg-gray-100 text-red-600">Reject</li>
                                            </ul>
                                                </div></span>: <div className={any.status=="Accept"? 'text-green-700 font-bold' :"text-red-700 font-bold" } > {any.status}ed </div> }
                                   </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
     );
}

export default Viewapp;