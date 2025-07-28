import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Appcontext } from "../context/context";
import Navbar from "../component/navbar";
import { assets } from "../assets/assets";
import Jobcard from "../component/jobcard";
import Footer from "../component/footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from '@clerk/clerk-react';

function Applyjob() {
    let {id}=useParams()
    let nav=useNavigate()
    let [jobdata,setdata]=useState(null)
    let {jobs,api,userdata,getapplicantsdata} =useContext(Appcontext)
let {user}=useUser()
    let {getToken}=useAuth()

async function applyjob() {
    try {
       if (!userdata) {
        return toast.error('login first')
    }
    if (!userdata.resume) {
        toast.error('upload resume')
        nav('/application')
    }
    let token=await getToken()
    let {data}=await axios.post(api+'/api/user/apply',{jobid:jobdata._id},{headers:{Authorization:`Bearer ${token}`}})
     if (data.success) {
        toast.success(data.message)
        await getapplicantsdata()
    }else{
        toast.error(data.message)
    }  
    } catch (error) {
        toast.error(error.message)
    }
    
}




async function getthatjob() {
    try {
       let {data}=await axios.get(`${api}/api/jobs/${id}`)
    if (data.success) {
        setdata(data.any)
    }else{
        toast.error(data.message)
    } 
    } catch (error) {
        toast.error(error.message)
    }
    
}


    useEffect( ()=>{ 
       getthatjob()
    }
    ,[id])

    return jobdata ? (
       <>
       <Navbar></Navbar>
       <div className="container mx-auto max-sm:px-5 px-10  ">
        <div className="flex flex-wrap justify-around bg-blue-100 rounded items-center gap-5 my-10 p-5">

            <div className="flex flex-wrap gap-3 my-10">
                <div className="flex items-center"><img className=" max-sm:w-25 w-20 m-2 my-5" src={jobdata.companyid.image} alt="" /></div>
            <div>
                <h2 className="font-medium text-2xl md:text-3xl my-5"> {jobdata.title} </h2>
                <div className="flex flex-wrap gap-5">
                    <span className="flex  gap-2"> <img className="w-5"   src={assets.suitcase_icon} alt="" /> {jobdata.companyid.name}  </span>
                    <span className="flex  gap-2"><img  className="w-5" src={assets.location_icon} alt="" /> {jobdata.location}</span>
                    <span className="flex  gap-2"><img  className="w-5" src={assets.person_icon} alt="" /> {jobdata.level}</span>
                    <span className="flex  gap-2"><img  className="w-5" src={assets.money_icon} alt="" /> ${jobdata.salary/1000}k</span>
                </div> 
            </div>
            </div>

        <div>
            <button onClick={applyjob} className="bg-blue-600 rounded my-1 py-2 px-4 text-white">Apply now</button>
        </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
            <div className="col-span-2 ">
                <h2 className="font-bold text-3xl mx-4">Job Description</h2>
            <p  className="font-light job-description" dangerouslySetInnerHTML={{__html:jobdata.description}}></p>
            </div>
            <div className="col-span-2 lg:col-span-1">
            <h2 className="font-medium text-gray-700 m-2 text-lg">More jobs from {jobdata.companyid.name} </h2>
            <div>
                {jobs.filter((anyjob)=>(anyjob.companyid.name==jobdata.companyid.name && anyjob._id != jobdata._id)).slice(0,3).map((any,idx)=><Jobcard key={idx} job={any} />)}
            </div>
            </div>
        </div>


       </div>
       <Footer></Footer>
       </>
    ):(<div>ok</div> )
}

export default Applyjob;