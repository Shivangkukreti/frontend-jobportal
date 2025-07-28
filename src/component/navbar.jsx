import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk,UserButton,useUser } from "@clerk/clerk-react";
import {  useContext } from "react";
import { Appcontext } from "../context/context";
import { toast } from "react-toastify";

function Navbar() {

    let {rshow ,setrshow,companytoken}=useContext(Appcontext)
    let {openSignIn}=useClerk()
    let {user}=useUser()
    let goto=useNavigate()

    return ( 
        <div className="shadow py-4">
            <div className="container px-[2%]   mx-auto flex justify-between">
                < img onClick={()=>goto('/')} className="cursor-pointer max-sm:w-25" src={assets.logo} alt="" />
                {
                    user ? <div className="flex gap-2 items-center">
                        <Link to={"/application"} >Applied jobs</Link>
                        <p>|</p>
                        <p className="max-sm:hidden">Hi {user.firstName+" "+user.lastName} </p>
                        <UserButton/>
                    </div>:
                    <div className="flex gap-4 ">
                        {companytoken? 
                        <button onClick={()=>goto('/dashboard')} className="text-gray-600 cursor-pointer">Dashboard</button>: 
                         <button onClick={()=>setrshow(true)} className="text-gray-600 cursor-pointer">Recruiter</button>}
               

                <button onClick={()=> companytoken?toast.error('Logout from Dashboard first'): openSignIn()} className="bg-sky-500  hover:bg-sky-700 px-5  text-white rounded-full">Login</button>
            </div> 
                }
               
            </div>
            
        </div>
     );
}

export default Navbar;