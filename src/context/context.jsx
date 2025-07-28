import {  createContext, useEffect, useState } from 'react';
import { jobsData } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from "axios";
import { useAuth, useUser } from '@clerk/clerk-react';
export const Appcontext= createContext()

function Appcontextprovider({children}) {
    let {user}=useUser()
    let {getToken}=useAuth()
    let api=import.meta.env.VITE_API
    let [search,setsearch]=useState({title:'',location:''})
    let [issearched,setisseached]=useState(false)
    let [jobs,setjobs]=useState([])
    let [rshow ,setrshow]=useState(false)
    let [companytoken,setcompanytoken]=useState(null)
    let [companydata,setcompanydata]=useState(null)
    let [userdata,setuserdata]=useState(null)
    let [userapp,setuserapp]=useState([])
    

 async function getuserdata() {
    try {
        let token = await getToken()
        let {data}=await axios.get(api+'/api/user/',{headers:{Authorization:`Bearer ${token}`}})

        
        if (data.success) {
            setuserdata(data.myuser)
            
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

useEffect(()=>{
    if (user) {
        getuserdata() 
    }
},[user])



 async function getjobs() {
        try {
            let {data}=await axios.get(api+'/api/jobs/')
            if (data.success) {
                setjobs(data.all)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{

        getjobs()
        let trytoken=localStorage.getItem('companytoken')
       if (trytoken) 
        { setcompanytoken(trytoken)}
    },[])



async function getcompanydata() {
        try { 
            let {data}=await axios.get(api+'/api/company/companydata',{headers:{token:companytoken}})
            
            if (data.success) {
                setcompanydata(data.company)
                // console.log(data.company);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

useEffect(()=>{
    if (companytoken) {   
 
     
    getcompanydata()
    }
},[companytoken])



async function getapplicantsdata() {
    try {
        let token= await getToken()
        let {data}=await axios.get(api+'/api/user/applications',{headers:{Authorization:`Bearer ${token}`}})
        if (data) {
            setuserapp(data.app)
            console.log(data.app);
            
        }else{
            toast.success(data.success)
        }
    } catch (error) {
        toast.success(data.error)
    }
}





let value={search,setsearch,issearched,setisseached,jobs,rshow,setrshow,
    companytoken,setcompanytoken,companydata,setcompanydata,api,userdata,setuserdata,
    userapp,setuserapp,getuserdata,getapplicantsdata,getjobs,getcompanydata} 

    return ( 
    <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
     );
}

export default Appcontextprovider;

