import { assets } from "../assets/assets";

function Footer() {
    return ( 
        <div className=" px-3 h-[50vh]">
            <div className="flex relative top-[90%]  flex-wrap  my-2  justify-between  items-center">
               <div className="flex flex-wrap  items-center space-x-2">
            <img src={assets.logo} alt="" />
            <p className="text-4xl max-sm:hidden text-gray-500">|</p>
            <p className="max-sm:text-xs">All right reserved. Copyright @job-portal</p>
        </div>
        <div className="flex ">
        <img className="w-10 m-2" src={assets.facebook_icon} alt="" />
        <img className="w-10  m-2" src={assets.twitter_icon} alt="" />
        <img className="w-10  m-2" src={assets.instagram_icon} alt="" />
        </div>   
        </div> 
            </div>
         
        
     );
}

export default Footer;