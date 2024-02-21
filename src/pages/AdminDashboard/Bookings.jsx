/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import instance from "../../config/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Bookings() {
  const [data, setData] = useState();
  const navigate = useNavigate()
  const getData = () => {
    instance.get("/admin/bookings").then((res) => {
      console.log(res.data);
      setData(res.data);
    }).catch(()=>{
      Cookies.remove("token")
      navigate("/")
    })
  };
  const handleClick = (id) =>{
    console.log(id)
    instance.delete("/admin/reached/"+id).then(()=>{
      getData()
    }).catch(()=>{
      Cookies.remove("token")
      navigate("/")
    })
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="h-screen overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SN
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Car Registeration number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((x, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{x?.driver}</td>
              <td className="px-6 py-4 whitespace-nowrap">{x?.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{x?.car}</td>
              <td className="px-6 py-4 whitespace-nowrap">{x?.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{x?.slot}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={()=>handleClick(x?.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reached</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
