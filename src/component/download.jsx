import { assets } from "../assets/assets";

function Appdownload() {
    return ( 
        <div className="container my-10 px-15 mx-auto">
            <div className="flex flex-wrap bg-gradient-to-r from-violet-50 to bg-purple-100 justify-evenly">
                <div className="">
                  <h1 className="font-medium text-center text-2xl p-5 mt-10">Download Mobile App For Better Experience</h1>
                <div className="flex space-x-4 justify-center ">
                <img className="w-25 md:w-fit max-sm:w-15" src={assets.play_store} alt="" />
                <img className="w-25 md:w-fit max-sm:w-15" src={assets.play_store} alt="" />
                </div>  
                </div>
                <div>
                    <img src={assets.app_main_img} alt="" />
                </div>
                
            </div>
        </div>
     );
}

export default Appdownload;