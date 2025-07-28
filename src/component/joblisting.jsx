import { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/context";
import {
  assets,
  JobCategories,
  JobLocations,
  jobsData,
} from "../assets/assets";
import Jobcard from "./jobcard";

function Joblisting() {
  let { search, issearched, setsearch, jobs } = useContext(Appcontext);
  let [setfilter, setshowfilter] = useState(false);
  let [cat,setcat]=useState([])
  let [location,setlocation]=useState([])
  let [filtered,setfiltered]=useState(jobs)

 useEffect(() => {
  if (location.length === 0 && cat.length === 0 && search.title.trim() === "" && search.location.trim() === "") {
    setfiltered(jobs); 
  } else {
    const result = jobs.filter((job) =>
      (location.length === 0 || location.includes(job.location)) &&
      (cat.length === 0 || cat.includes(job.category))&&
      (search.title==="" || job.title.toLowerCase().includes(search.title.trim().toLowerCase()))&&
      (search.location==="" || job.location.toLowerCase().includes(search.location.trim().toLowerCase()))
    );
    setfiltered(result);
  }

}, [location, cat, jobs,search]);

  let [page, setpage] = useState(1);

  return (
    <div className="container grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 px-5 my-10 mx-auto">
      <div className="  col-span-2 md:col-span-3 lg:col-span-1">
        <div className="m-3 flex-col flex-wrap">
          {issearched && (search.title != "" || search.location != "") && (
            <>
              <h3 className="font-bold text-2xl m-4">Current Search</h3>
              <div>
                {" "}
                {issearched && search.location != "" && (
                  <span
                    onClick={() =>
                      setsearch((prev) => ({ ...prev, location: "" }))
                    }
                    className="inline-flex m-2 bg-blue-200 rounded border-2 border-blue-400 hover:border-blue-800 w-max px-2 py-1 items-center justify-between"
                  >
                    <p className="font-bold text-lg"> {search.location} </p>
                    <img
                      className="h-4 self-center mx-2"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {issearched && search.title != "" && (
                  <span
                    onClick={() =>
                      setsearch((prev) => ({ ...prev, title: "" }))
                    }
                    className="inline-flex m-2 bg-red-200 rounded  border-2 border-red-400 hover:border-red-700 w-max py-1 px-2 items-center justify-between"
                  >
                    <p className="font-bold text-lg"> {search.title} </p>
                    <img
                      className="h-4 self-center mx-2"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        <button
          className="bg-blue-600 rounded my-1 py-1 px-2 text-white"
          onClick={() =>{
            setcat([]),
            setlocation([]),
            setshowfilter((prev) => !prev)
           }
            }
        >
          {" "}
          {setfilter ? "Filter" : "Close"}{" "}
        </button>
        <div className={setfilter ? "hidden" : ""}>
          <div className=" grid  grid-cols-2 lg:grid-cols-1">
            <div className="mx-3 md:col-span-1">
              <h2 className="font-medium max-sm:text-xl text-2xl py-4 ">
                Search by Categories
              </h2>
              <ul className="text-gray-600 mx-2">
                {JobCategories.map((any, idx) => (
                  <label key={idx}>
                    <li className="py-1  ">
                      <input type="checkbox" onChange={()=> setcat(prev=>prev.includes(any)? prev.filter(job=>job!=any):[...prev,any])} />
                      {any}
                    </li>
                  </label>
                ))}
              </ul>
            </div>
            <div className="mx-3 md:col-span-1">
              <h2 className="font-medium max-sm:text-xl text-2xl  lg:text-lg py-4 ">
                Search by Locations
              </h2>
              <ul className="text-gray-600 mx-2">
                {JobLocations.map((any, idx) => (
                  <label key={idx}>
                    <li className="py-1  ">
                      <input type="checkbox" onChange={()=> setlocation(prev=>prev.includes(any)? prev.filter(job=>job!=any):[...prev,any])} />
                      {any}
                    </li>
                  </label>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 my-3 md:col-span-3">
        <h2 className="font-medium my-1  text-4xl">Latest jobs</h2>
        <p className="text-gray-500">Get your desired job from top companies</p>

        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1   gap-3">
          {filtered.slice((page - 1) * 6, page * 6).map((job, idx) => (
            <Jobcard key={idx} job={job} />
          ))}
        </div>

        {jobs.length > 0 && (
          <div className="flex justify-center items-center space-x-2 mt-10 mx-auto">
            <a href="#">
              <img
                onClick={() => setpage(Math.max(page - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(filtered.length / 6) }).map(
              (_, idx) => (
                <a key={idx} href="#">
                  <button
                    onClick={() => setpage(idx + 1)}
                    className={`w-10 h-10 border border-gray-500 hover:bg-blue-100 rounded ${
                      page === idx + 1 ? "bg-blue-100" : ""
                    }`}
                  >
                    {" "}
                    {idx + 1}{" "}
                  </button>
                </a>
              )
            )}
            <a href="#">
              <img
                onClick={() =>
                  setpage(Math.min(page + 1, Math.ceil(filtered.length / 6)))
                }
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Joblisting;
