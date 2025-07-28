import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect ,useContext } from "react";
import { Appcontext } from "../context/context";

function Dashboard() {
 
  let navback=useNavigate()
   let navi=useNavigate()
let {companydata,setcompanydata,companytoken,setcompanytoken}=useContext(Appcontext)

useEffect(() => {
    if (!companytoken) {
      navi("/"); // redirect to home if no token
    } else {
      navi("/dashboard/managejobs"); // redirect inside dashboard
    }

  }, [companytoken]);

 

async function logout() {
  setcompanytoken(null)
  localStorage.removeItem('companytoken')
  setcompanydata(null)
  navback('/')
}

  return (
    <>
     <div className="flex items-center justify-between px-10 space-y-3   border-b border-gray-100 shadow">
        <div className="cursor-pointer " onClick={()=>navback('/')}>
          <img className="mt-2" src={assets.logo} alt="" />
        </div>
        <div className="flex items-center gap-3">
          <p className="">Welcome ,{companydata ? companydata.name:""} </p>
          <div className="relative   group">
            <img className="cursor-pointer h-10 w-10" src={companydata ? companydata.image:"#"} alt="" />
            <div className="absolute  right-0  w-40 bg-white rounded shadow-xl hidden group-hover:block z-20">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My profile
                </li>
                <li onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    <div className="min-h-screen flex "> 
      <div className="min-h-screen shrink-0 inline-block shadow border-gray-100  border-r">
        <div>
          <NavLink
            className={({ isActive }) =>
              `block px-4 py-3 rounded font-medium text-center shadow m-1 ${
                isActive
                  ? "bg-blue-200 text-white border-r-4 border-blue-800"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
            to={"/dashboard/addjobs"}
          >
             <div className="flex gap-2">
                <img src={assets.add_icon} alt="" />
             <p className="hidden lg:flex">Add jobs</p></div>
          </NavLink>
        </div>
        <div>
          <NavLink
            className={({ isActive }) =>
              `block px-4 py-3 rounded font-medium text-center shadow m-1 ${
                isActive
                  ? "bg-blue-200 text-white border-r-4 border-blue-800"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
            to={"/dashboard/managejobs"}
          >
             <div className="flex gap-2 ">
                <img src={assets.home_icon} alt="" />
            <p className="hidden lg:flex">Manage Jobs</p></div>
          </NavLink>
        </div>
       <div>
          <NavLink
            className={({ isActive }) =>
              `block px-4 py-3 rounded font-medium text-center shadow m-1 ${
                isActive
                  ? "bg-blue-200 text-white  border-r-4 border-blue-800"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
            to={"/dashboard/viewapplication"}
          >
            <div className="flex gap-2">
                <img src={assets.person_tick_icon} alt="" />
            <p className="hidden  lg:flex">View applications </p>
            </div>
            
            
          </NavLink>
        </div>
      </div>
   <div className="w-full" >
    <Outlet/>
   </div>

     </div>
    </>
    
  );
}

export default Dashboard;
