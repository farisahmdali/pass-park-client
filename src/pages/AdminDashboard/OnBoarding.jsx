import React, { useEffect, useState } from "react";
import instance from "../../config/axios";

function OnBoarding({onClose}) {
  const [data, setData] = useState({ floorDetails: [] });
  const [submit, setSubmit] = useState("start");
  const [boxes, setBoxes] = useState();

  useEffect(() => {
    setBoxes(Array.from({ length: data?.numberOfFloors || 0 }, (_, i) => i + 1));
  }, [data?.numberOfFloors]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API_BASE_URL);
    instance.post("/admin/onBoard",data).then((res)=>{
      onClose()
    }).catch((err)=>console.log(err))
  };
  const floorDetails = (i, name, val) => {
    let temp = { ...data };

      temp.floorDetails[i - 1] = { ...temp.floorDetails[i - 1], [name]: val };
   
    setData({ ...temp });
  };
  return (
    <div className={"items-center justify-center min-h-screen bg-gray-100 flex flex-col"}>
      {submit === "start" && (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Onboarding</h2>
          <input  className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" type="text" name="name" onChange={handleChange} placeholder="Parking lot name" />
          <input className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" type="text" name="location" onChange={handleChange} placeholder="Location" />
          <input className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" type="number" name="numberOfFloors" onChange={handleChange} placeholder="Number of floors" />
          <button onClick={() => setSubmit("next")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Submit
          </button>
        </div>
      )}

      {submit === "next" && (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 p-3">
          {boxes?.map((x) => (
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Floor {x}</h2>
              <input min={0} onChange={(e) => floorDetails(x, e.target.name, e.target.value)} name="small" className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" type="number" placeholder="Number Small Size Parking lot" />
              <input min={0} onChange={(e) => floorDetails(x, e.target.name, e.target.value)} name="medium" className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" type="number" placeholder="Number Medium Size Parking lot" />
              <input min={0} onChange={(e) => floorDetails(x, e.target.name, e.target.value)} name="large" className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" type="number" placeholder="Number large Size Parking lot" />
              <input min={0} onChange={(e) => floorDetails(x, e.target.name, e.target.value)} name="xlarge" className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" type="number" placeholder="Number XLarge Size Parking lot" />
            </div>
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 fixed right-3 top-3 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default OnBoarding;
