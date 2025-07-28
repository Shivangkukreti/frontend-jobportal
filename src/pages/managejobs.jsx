import { useNavigate } from "react-router-dom";
import { manageJobsData } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Appcontext } from "../context/context";
import axios from "axios";
function Managejobs() {
let navaddjob=useNavigate()
let {companytoken,api,getjobs}=useContext(Appcontext)
let [jobs,setjobs]=useState([])

async function getmanagedata() {
       try {
      let {data}=await axios.get(api+'/api/company/listjobs',{headers:{token:companytoken}})
if (data.success) {
    await getjobs()
    setjobs(data.jobdata)
    
    
}else{
    toast.error(data.message)
}  
    } catch (error) {
       toast.error(error.message) 
    }  
    }

useEffect( ()=>{
    if (companytoken) {
        getmanagedata()  
    }
    
},[companytoken])

async function changevisiblity(id) {
    try {
     let {data} =   await axios.post(api+'/api/company/changevisiblity',{id},{headers:{token:companytoken}})
     if (data.success) {
        toast.success(data.message)
        getmanagedata()
     }else{
        toast.error(data.message)
     }
    } catch (error) {
        toast.error(error.message)
    }
    
}

    return ( 
       <div className="container sm:px-10 mx-auto" >
                   <table className="min-w-full border rounded border-gray-200 shadow mt-10 ">
                       <thead >
                           <tr>
                               <th className="p-2 max-sm:hidden max-sm:text-xs border-b border-gray-300 shadow">#</th>
                               <th className="p-2 max-sm:text-xs border-b border-gray-300 shadow">Job Title</th>
                               <th className="p-2 max-sm:text-xs border-b border-gray-300 shadow">Location</th>
                               <th className="p-2 max-sm:text-xs border-b border-gray-300 shadow">Applicants</th>
                               <th className="p-2 max-sm:text-xs border-b border-gray-300 shadow">Visible</th>
                           </tr>
                       </thead>
                       <tbody>
                           {jobs.map((any,idx)=>{
                               return(
                                   <tr key={idx} className="">
                                       <td className="p-2 max-sm:hidden max-sm:text-xs border-b border-gray-200 text-center">  {idx+1} </td>
                                       <td className="p-2 max-sm:text-xs border-b border-gray-200 text-center"> {any.title} </td>
                                       <td className="p-2 max-sm:text-xs border-b border-gray-200 text-center"> {any.location} </td>
                                       <td className="p-2 max-sm:text-xs border-b border-gray-200 text-center"> {any.applicants} </td>
                                       <td className="p-2 max-sm:text-xs border-b border-gray-200 text-center">
                                         <input onChange={()=>changevisiblity(any._id)} checked={any.visible} className="scale-125" type="checkbox" name="" id="" /> </td>
                                       
                                   </tr>
                               )
                           })}
                       </tbody>
                   </table>
                   <div>
                    <button onClick={()=>navaddjob("/dashboard/addjobs")} className=" m-5 border rounded bg-black text-white px-3 py-1 cursor-pointer block mx-auto">Add new job</button>
                   </div>
               </div>
     );
}

export default Managejobs;