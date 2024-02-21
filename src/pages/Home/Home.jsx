import React, { useContext, useEffect, useState } from "react";
import instance from "../../config/axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../config/context";

function Home() {
  const [dropDown, setDropDown] = useState();
  const [data,setData] = useState()
  const navigate = useNavigate()
  const {setState} = useContext(UserContext)
  const getPlaces = () => {
    instance.get("/placesDrop").then((res) => {
      setDropDown(res.data);
      console.log(res.data);
    });
  };
  const handleChange = (e) =>{
    setData({...data,[e.target.name]: e.target.value})
  }
  const handleClick=()=>{
    setState(data)
    navigate("/slots")
  }

  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <div className="">
      <div className="w-screen h-screen home-design">
        <div className="bg-[#26507385] w-screen h-screen">
          <nav className="flex items-center justify-center p-4  text-white">
            <div className="flex items-center w-5/6 justify-between">
              <h1 className="text-2xl font-bold mr-4">PASSPARK</h1>
              <ul className="flex space-x-4">
                <li className="hover:underline cursor-pointer">HOME</li>
                <li className="hover:underline cursor-pointer">ABOUT</li>
                <li className="hover:underline cursor-pointer">WHY US</li>
                <li className="hover:underline cursor-pointer">TETSIMONIAL</li>
              </ul>
            </div>
          </nav>

          <div className="mt-[150px]">
            <h1 className="text-white text-4xl text-center">FINDING PARKING LOTS MADE EASY</h1>
            <p className="text-white text-center">Pre book your slot no need to wait!</p>
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-wrap justify-center items-center w-2/4 gap-4">
              <select onChange={handleChange} name="area" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm">
                <option value="">Select Parking Area</option>
                {dropDown?.locations?.map((x, index) => (
                  <option key={index} value={x} className="text-gray-900">
                    {x}
                  </option>
                ))}
              </select>
              <input onChange={handleChange} name="driver" type="text" placeholder="Enter Your Name" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm" />
              <input onChange={handleChange} name="number" type="text" placeholder="Enter Your Phone number" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm" />
              <input onChange={handleChange} name="car" type="text" placeholder="Enter Your Car Registration Number" className="w-full md:w-1/2 lg:w-1/2 xl:w-1/4 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-b-500 sm:text-sm" />
              <button onClick={handleClick} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
