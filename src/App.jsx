import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Applyjob from "./pages/applyjob"
import Application from "./pages/application"
import { useContext } from "react"
import { Appcontext } from "./context/context"
import Recruiterlogin from "./component/rlogin"
import Dashboard from "./pages/dashboard"
import Addjobs from "./pages/addjobs"
import Managejobs from "./pages/managejobs"
import Viewapp from "./pages/viewapp"
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  let {rshow}=useContext(Appcontext)
  return (
    
    <>
    {rshow && <Recruiterlogin></Recruiterlogin>}
        <ToastContainer />
    <Routes>
      <Route path="apply/:id" element={<Applyjob></Applyjob>} />
      <Route path="/" element={<Home></Home>} />
      <Route path="/application" element={<Application/>} />
      <Route path="/dashboard" element={<Dashboard/>} >
        <Route path="addjobs" element={<Addjobs/>} />
        <Route path="managejobs" element={<Managejobs/>} />
        <Route path="viewapplication" element={<Viewapp/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
