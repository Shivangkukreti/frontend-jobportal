import { useContext, useState } from "react";
import Navbar from "../component/navbar";
import { assets, jobsApplied } from "../assets/assets";
import Footer from "../component/footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from '@clerk/clerk-react';
import { Appcontext } from "../context/context";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Application() {
let [resume, setresume] = useState(null);
let [edit,setedit]=useState(false)
 let {api,userdata,userapp,getuserdata,getapplicantsdata} = useContext(Appcontext)
let {user}=useUser()
    let {getToken}=useAuth()


    useEffect(()=>{
      if (userdata && userdata.resume=='') {
        setedit(true)
      }
    },[userdata])

  async function updresume() {
      try {
          let formdata=new FormData()
          formdata.append('resume',resume)
          const token = await getToken()
          let {data}=await axios.post(api+'/api/user/updateresume',formdata,{headers:{Authorization:`Bearer ${token}`}})
          if (data.success) {
            toast.success(data.message)
            await getuserdata()
            console.log(userdata);
            
          }else{
            toast.success(data.message)
          }
      } catch (error) {
          toast.success(error.message)
      }
  }
  useEffect(()=>{
    if (userdata) {
      setresume(userdata.resume)
    }
  },[userdata])


  useEffect(()=>{
    if (user) {
        getapplicantsdata()
    }
},[user])
  return (
    <>
      <Navbar></Navbar>
      <div className="container px-10 my-10 mx-auto">
        <div className="my-3">
          <h2 className="font-medium text-2xl m-3">Your Resume</h2>

          {resume==null || edit ? (
            <div className="flex">
              <p className="mx-2  rounded px-2 py-2 text-blue-900 bg-blue-200  inline ">
                Select resume
              </p>
              <label>
                <input
                  onChange={(e) => setresume(e.target.files[0])}
                  type="file"
                  hidden
                  name="resume"
                />
                <img
                  className="cursor-pointer"
                  src={assets.profile_upload_icon}
                  alt=""
                />
              </label>
              <button
                className="mx-2 cursor-pointer rounded px-2 py-2 text-green-900 bg-green-200"
                onClick={() => {
                  updresume(),
                  resume
                    ? setedit(!edit)
                    : alert("Please select a file first.");
                }}
              >
                {" "}
                Save
              </button>
            </div>
          ) : (
            <div>
              <button className="mx-2 border rounded cursor-pointer px-2 py-2 text-blue-900 bg-blue-200 border-blue-600">
                <NavLink to={userdata.resume}>view</NavLink>
              </button>
              <button
                onClick={() => setedit(!edit)}
                className="border mx-2 cursor-pointer rounded px-2 py-2 text-red-900 bg-red-200"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="m-3">
          <h2 className="font-medium text-2xl ">Job Applied</h2>
          <table className="min-w-full border rounded-lg border-gray-400">
            <thead className="">
              <tr className="">
                <th className="py-3 px-6 border-b border-gray-400 text-left">
                  Company
                </th>
                <th className="py-3 px-4 border-b border-gray-400 text-left">
                  Title
                </th>
                <th className="py-3 px-4 border-b border-gray-400 text-left">
                  Location
                </th>
                <th className="py-3 px-4 border-b border-gray-400 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              
              {  userapp.map((any, idx) => {
                return (
                  <tr key={idx}>
                    <td className="py-2 flex items-center gap-2 px-4 border-b border-gray-300 ">
                      {" "}
                      <img className="w-10" src={any.companyid.image} /> {any.companyid.name}{" "}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {any.jobid.title}{" "}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {" "}
                      {any.jobid.location}{" "}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <span
                        className={
                          any.status == "Accept"
                            ? "bg-green-300 text-green-700 rounded px-2 py-1"
                            : "bg-red-300 text-red-700 rounded px-2 py-1"
                        }
                      >
                        {any.status}
                      </span>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Application;
