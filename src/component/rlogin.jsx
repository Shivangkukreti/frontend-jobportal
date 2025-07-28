import { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

function Recruiterlogin() {
    const [formdata, setform] = useState({username:'',password:'',email:''});
    let [state,setstate]=useState('Login')
    let [formsubmit,setformsubmit]=useState(false)
    let goto= useNavigate()
    let [logo,setlogo]=useState()
    let {api,setrshow,setcompanytoken,setcompanydata}=useContext(Appcontext)
  
    function handleall(event) {
      const { name, value } = event.target;
      setform(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    async function handlesubmit(event) {
      event.preventDefault();
      setformsubmit(true)
      try {
        if (state == 'Login') {
           let {data}=await axios.post(api+"/api/company/login",{email:formdata.email,password:formdata.password}) 
           if (data.success) {
            console.log(data);
            setcompanydata(data.company)
            setcompanytoken(data.token)
            localStorage.setItem('companytoken',data.token)
            setrshow(false)
            goto('/dashboard')
           }else{
            toast.error(data.message)
           }
        }

        if (state =='Signup') {
            let newdata= new FormData()
            newdata.append('name',formdata.username)
            newdata.append('email',formdata.email)
            newdata.append('password',formdata.password)
            newdata.append('image',logo)
            let {data}=await axios.post(api+"/api/company/register",newdata) 
           if (data.success) {
             console.log(data);
            setcompanydata(data.company)
            setcompanytoken(data.token)
            localStorage.setItem('companytoken',data.token)
            setrshow(false)
            goto('/dashboard')
           }else{
            toast.error(data.message)
           }
           

        }
      } catch (error) {
        toast.error(error.message)
      }
      console.log(formdata);
      setform({username:'',password:'',email:''});
    }
    
    useEffect(()=>{
        document.body.style.overflow="hidden"
        return ()=>{
            document.body.style.overflow="unset"}
        
    },[])

    return ( 
        <div className="absolute top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm flex justify-center items-center">
            <form onSubmit={handlesubmit} className="flex flex-col bg-white  relative p-4 rounded shadow ">
                <h1 className="text-center text-3xl text-gray-600">Recruiter {state}</h1>
                <img onClick={()=>setrshow(false)}  className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} alt="" />

                {
                    state=="Signup" && formsubmit ?
                     <div className="m-2 mt-5 space-y-4">
                        <label className="flex border rounded-xl border-gray-300 gap-2 p-1 " >
                            <p className="font-extralight p-5">Upload Company Logo</p>
                    <img  className="w-max h-20 rounded-full " src={logo ? URL.createObjectURL(logo): assets.upload_area} alt="" />
                    <input  hidden required placeholder="company logo" onChange={(e)=>setlogo(e.target.files[0])}  type="file" name="image"  />
                </label>
                <button type="submit" className="bg-blue-600 text-white rounded-2xl px-4 py-2 mx-auto block cursor-pointer" >Create Account</button>
                     </div>
                     :
                     <div className="m-2 mt-5 space-y-4">
                    {state !="Login" && (
                     <label className="flex border rounded-xl border-gray-300 gap-2 p-1 " >
                    <img src={assets.person_icon} alt="" />
                    <input  required placeholder="company name" onChange={handleall} value={formdata.username} type="text" name="username"  />
                </label>   
                    )}
                    
                <label className="flex border rounded-xl border-gray-300 gap-2 p-1" >
                    <img src={assets.email_icon} alt="" />
                    <input required placeholder="email" onChange={handleall} value={formdata.email} type="email" name="email"  />
                </label>
                <label className="flex border rounded-xl border-gray-300 gap-2 p-1">
                    <img src={assets.lock_icon} alt="" />
                    <input required placeholder="password" onChange={handleall} value={formdata.password} type="password" name="password"  />
                </label>
                   {state=="Login" && <p className="text-blue-600 font-medium cursor-pointer ">Forgot password ?</p>} 
                <button onClick={()=>setformsubmit(true)}  type={state=='Login' ? 'submit':'button'} className="bg-blue-600 text-white rounded-2xl px-4 py-2 mx-auto block cursor-pointer"> {state} </button>
                <div className="text-center font-extralight">{state=='Login' ?  <p>don't have an account ? <span onClick={()=>setstate('Signup')} className="text-blue-600 font-medium cursor-pointer underline">Sign up</span></p> :
                <p>Already have an account ! <span onClick={()=>setstate('Login')} className="text-blue-600 font-medium cursor-pointer underline">Login</span></p> }
                 </div>
                </div>
                }

               
                
            </form>
        </div>
     );
}

export default Recruiterlogin;