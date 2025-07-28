import React, { useState, useEffect, useRef, useContext } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';
import { toast } from "react-toastify";
import axios from "axios";
import  Quill  from "quill";
import Theme from 'quill/core/theme';
import { Appcontext } from '../context/context';

function Addjobs() {
const [formdata, setform] = useState({title:'',location:'Bangalore',category:'Programming',level:'Beginner level',salary:0});
let {companytoken,api,getjobs}=useContext(Appcontext)
let quillref=useRef()
let editorref=useRef()
function handleall(event) {
  const { name, value } = event.target;
  setform(prev => ({
    ...prev,
    [name]: value
  }));
}


useEffect(()=>{
    if (!quillref.current && editorref.current) {
        quillref.current=new Quill(editorref.current,{theme:'snow'})
    }
},[])

async function handlesubmit(event) {
  event.preventDefault();
formdata.description=quillref.current.root.innerHTML

try {
   const {data}=await axios.post(api+"/api/company/postjob",formdata,{headers:{token:companytoken}}) 
   console.log(data.success);
   console.log(data.message);
   if (data.success) {
    toast.success(data.message)
    await getjobs()
    setform({title:'',location:'Banglore',category:'Programming',level:'Beginner level',salary:0});
   quillref.current.root.innerHTML=''
}
  console.log(formdata);
} catch (error) {
    toast.error(error.message)
}

  
}

    return ( 
        <div className=" w-120 max-md:w-[75%] mx-auto  my-4 ">
            
            <form onSubmit={handlesubmit} className=" font-extralight border px-4 py-2 border-gray-200 rounded shadow-xl">
               <label className="flex flex-col  py-1" >Job Title
                <input onChange={handleall} value={formdata.title} className="border shadow outline-none py-1 rounded border-gray-200" type="text" name="title"  />
            </label>
            <label className="flex flex-col py-1" >Job Description
                <div  ref={editorref}>
                
                </div>
                {/* <textarea className="border shadow outline-none py-1 rounded border-gray-200" type="text" name="description"  /> */}
            </label> 
            <div className="grid grid-cols-3 gap-2">
               <label className="flex flex-col py-1 " >Job Category
                <select onChange={handleall} value={formdata.category} name="category" className="border shadow outline-none py-2  rounded border-gray-200">
                    {JobCategories.map((any,idx)=>
                        <option className='font-extralight' key={idx} value={any}>{any}</option>
                    )}
                </select>
            </label>
            <label className="flex flex-col py-1" >Job Level
                <select onChange={handleall} value={formdata.level} name="level" className="border shadow outline-none py-2  rounded border-gray-200">
                <option className='font-extralight'  value={"Beginner level"}>Beginner level</option>
                        <option className='font-extralight'  value={"Intermediate level"}>Intermediate level</option>
                        <option className='font-extralight'  value={"Senior level"}>Senior level</option></select>
            </label>
            <label className="flex flex-col py-1" >Job Location
                <select onChange={handleall} value={formdata.location} name="location" className="border shadow outline-none py-2  rounded border-gray-200">
                    {JobLocations.map((any,idx)=>
                        <option className='font-extralight' key={idx} value={any}>{any}</option>
                    )}    
                </select>
            </label>  
            </div>
            <label className="flex flex-col w-fit  py-1 " >Salary
                <input onChange={handleall} value={formdata.salary} className="border shadow outline-none py-1 rounded border-gray-200 " min={0} type="number" name="salary"  />
            </label>
            <button type='submit' className="mx-auto bg-black text-white rounded block m-3  px-4 py-1">Add</button>
           
            </form>
            
        </div>
     );
}

export default Addjobs;